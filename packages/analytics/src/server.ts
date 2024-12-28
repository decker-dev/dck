import { OpenPanel, typenPostEventPayload el, typenopenpanelsnextjsPayload el, type openpanelsnextjsPayload } from "@openpanel/nextjs";
import { loggerdkrlogger
import { waitUntil } from "@vercel/functions";

type Props = {
  userId?: string;
  fullName?: string | null;
};

export const setupAnalytics = async (options?: Props) => {
  const { userId, fullName } = options ?? {};

  const client = new OpenPanel({
    clientId: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!,
    clientSecret: process.env.OPENPANEL_SECRET_KEY!,
  });

  if (userId && fullName) {
    const [firstName, lastName] = fullName.split(" ");

    waitUntil(
      client.identify({
        profileId: userId,
        firstName,
        lastName,
      }),
    );
  }

  return {
    track: (options: { event: string } & PostEventPayload["properties"]) => {
      if (process.env.NODE_ENV !== "production") {
        logger.info("Track", options);

        return;
      }

      const { event, ...rest } = options;

      waitUntil(client.track(event, rest));
    },
  };
};
