"use client";

import { useOnlineCount } from "@/atoms";
import { Divider } from "@/components/ui/divider";
import { FloatPopover } from "@/components/ui/float-popover";
import { NumberSmoothTransition } from "@/components/ui/number-transition/NumberSmoothTransition";
import { TrackerAction } from "@/constants/tracker";
import { usePageIsActive } from "@/hooks/common/use-is-active";
import { useSocketIsConnect } from "@/socket/hooks";

export const GatewayCount = () => {
  return (
    <FloatPopover
      as="span"
      TriggerComponent={GatewayCountTrigger}
      type="tooltip"
      wrapperClassName="cursor-help"
    >
      <div className="space-y-2 leading-relaxed">
        <p className="flex items-center space-x-1 opacity-80">
          <i className="icon-[mingcute--question-line]" />
          <span className="font-medium">How is this implemented?</span>
        </p>
        <p>
          When you open this page, it will automatically establish a WebSocket
          connection. Once successfully connected, the server will push the
          current number of people viewing the page.
        </p>
        <p>
          WebSocket is used to notify the website owner about real-time
          activities on the site, including but not limited to the publication
          and updates of articles.
        </p>

        <Divider />

        <p>
          Current Socket Status: <ConnectedIndicator />
        </p>
      </div>
    </FloatPopover>
  );
};

const ConnectedIndicator = () => {
  const connected = useSocketIsConnect();

  return (
    <div className="inline-flex items-center">
      {connected ? (
        <>
          <span
            className="absolute h-5 w-5"
            style={{
              background: `radial-gradient(45.91% 45.91% at 49.81% 54.09%, #00FC47 7.13%, rgba(174, 244, 194, 0.46) 65.83%, rgba(252, 252, 252, 0.00) 100%)`,
            }}
          />

          <span className="ml-6">Connected</span>
        </>
      ) : (
        <>
          <span
            className="absolute h-5 w-5"
            style={{
              background: `radial-gradient(45.91% 45.91% at 49.81% 54.09%, #FC0000 7.13%, rgba(244, 174, 174, 0.46) 65.83%, rgba(252, 252, 252, 0.00) 100%)`,
            }}
          />

          <span className="ml-6">Not Connected</span>
        </>
      )}
    </div>
  );
};

const GatewayCountTrigger = () => {
  const isActive = usePageIsActive();
  const count = useOnlineCount();

  if (!isActive) return null;
  return (
    <span key={count}>
      Currently being viewed by{" "}
      <span>
        <NumberSmoothTransition>{count}</NumberSmoothTransition>
      </span>{" "}
      people
    </span>
  );
};
