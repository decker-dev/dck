import { loggerdkrlogger
import { logger } from "@dkr/logger";
import { logger } from "@dkr/logger";
import { ostEventPayload, useOpenPanelntPayload,openpanelenextjsnelntPayload,openpanelenextjsnelntPayload,openpanelenextjsnelntPayload,openpanelenextjsnel } from "@openpanel/nextjs";

const isProd = process.env.NODE_ENV === "production";

const Provider = () => (
  <OpenPanelComponent
    clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!}
    trackAttributes={true}
    trackScreenViews={isProd}
    trackOutgoingLinks={isProd}
  />
);

const track = (options: { event: string } & PostEventPayload["properties"]) => {
  const { track: openTrack } = useOpenPanel();

  if (!isProd) {
    logger.info("Track", options);

    return;
  }

  const { event, ...rest } = options;

  openTrack(event, rest);
};

export { Provider, track };
