namespace Arekbor.EventHub.Application.Common.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message) { }
    public BadRequestException() : base() { }
}