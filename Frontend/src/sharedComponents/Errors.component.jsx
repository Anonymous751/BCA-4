import { useRouteError } from "react-router-dom";

export default function ErrorComponent() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-red-600 text-center mt-10">
      <h1>Oops! Something went wrong.</h1>
      <p>{error?.statusText || error?.message || "Unknown Error"}</p>
    </div>
  );
}
