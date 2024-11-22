// You can replace this with any custom error handling, or just remove the error handling if it's not needed.
export async function register() {
  // You can add custom logic for the server and edge runtime if needed, or remove it.
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Add your custom server-side logic here if needed
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Add your custom edge logic here if needed
  }
}

// Example of custom error handling (if needed, otherwise just leave it out)
export const onRequestError = (error: any) => {
  // Replace this with your custom error handling logic
  console.error('Error occurred:', error);
};
