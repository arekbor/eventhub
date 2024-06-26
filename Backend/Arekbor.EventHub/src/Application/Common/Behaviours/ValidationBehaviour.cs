using Arekbor.EventHub.Application.Common.Exceptions;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.Common.Behaviours;

public class ValidationBehaviour<TRequest, TResult>(
    IEnumerable<IValidator<TRequest>> validators) : IPipelineBehavior<TRequest, TResult>
    where TRequest : IRequest<TResult>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators = validators;

    public async Task<TResult> Handle
        (TRequest request, RequestHandlerDelegate<TResult> next, CancellationToken cancellationToken)
    {
        if (!_validators.Any())
            return await next();

        var failures = _validators
            .Select(x => x.Validate(request))
            .Where(x => x.IsValid == false)
            .AsEnumerable();

        if (failures.Any())
            throw new ModelsValidationException(failures);

        return await next();
    }
}