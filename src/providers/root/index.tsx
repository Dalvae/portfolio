"use client";
import { Provider as BalancerProvider } from "react-wrap-balancer";
import { LazyMotion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

import { ModalStackProvider } from "@/components/ui/modal";
import { useBeforeUnload } from "@/hooks/common/use-before-unload";

import { ProviderComposer } from "../../components/common/ProviderComposer";
import { EventProvider } from "./event-provider";
import { JotaiStoreProvider } from "./jotai-provider";
import { PageScrollInfoProvider } from "./page-scroll-info-provider";

const loadFeatures = () =>
  import("./framer-lazy-feature").then((res) => res.default);

const baseContexts: JSX.Element[] = [
  <ThemeProvider key="themeProvider" />,

  <JotaiStoreProvider key="jotaiStoreProvider" />,

  <BalancerProvider key="balancerProvider" />,
  <LazyMotion features={loadFeatures} strict key="framer" />,
];

export function WebAppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <ProviderComposer contexts={baseContexts}>
        {children}
        <ModalStackProvider key="modalStackProvider" />
        <EventProvider key="viewportProvider" />
        {/* <SentryProvider key="SentryProvider" /> Opcionalmente reactivado si es necesario */}
        <PageScrollInfoProvider key="PageScrollInfoProvider" />
      </ProviderComposer>
    </>
  );
}
