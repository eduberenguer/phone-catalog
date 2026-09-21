export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function request<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  const url = `${import.meta.env.VITE_API_URL}${path}`;
  let response: Response;

  try {
    response = await fetch(url, {
      headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error;
    throw new ApiError("Network error", 0);
  }

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }
  return response.json();
}
