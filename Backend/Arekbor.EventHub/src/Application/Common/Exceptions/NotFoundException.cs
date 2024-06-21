namespace Arekbor.EventHub.Application.Common.Exceptions;

public class NotFoundException(string message) : Exception(message)
{
}