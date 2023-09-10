"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import ToastProvider from "./ToastProvider";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        <ToastProvider>{children}</ToastProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}

export default Providers;
