import React from "react";
import type { FC } from "react";

import { PhSunBold } from "@/components/icons/appearance";
import {
  EmojiAngry,
  EmojiFlushed,
  EmojiFrownOpen,
  EmojiGrimace,
  EmojiGrinSquintTears,
  EmojiMeh,
  EmojiSadCry,
  EmojiSadTear,
  EmojiSmile,
  EmojiTired,
} from "@/components/icons/emoji";
import {
  BiCloudLightningRainFill,
  BiCloudRainFill,
  MdiCloud,
  MdiSnowflake,
  RiSunCloudyFill,
} from "@/components/icons/weather";

export const weather2icon = (weather: string) => {
  const map: Record<string, FC> = {
    Clear: PhSunBold,
    Cloudy: RiSunCloudyFill,
    Overcast: MdiCloud,
    Snow: MdiSnowflake,
    Rain: BiCloudRainFill,
    Thunderstorm: BiCloudLightningRainFill,
  };
  return React.createElement(map[weather] || PhSunBold);
};

export const mood2icon = (mood: string) => {
  const map: Record<string, FC> = {
    Happy: EmojiSmile,
    Sad: EmojiSadTear,
    Crying: EmojiSadCry,
    Angry: EmojiAngry,
    "In pain": EmojiTired,
    Sorrowful: EmojiMeh,
    Unhappy: EmojiMeh,
    Excited: EmojiGrinSquintTears,
    Worried: EmojiFrownOpen,
    Terrified: EmojiGrimace,
    Disgusted: EmojiAngry,
    Desperate: EmojiFrownOpen,
    Anxious: EmojiFlushed,
  };
  return React.createElement(map[mood] || EmojiSmile);
};
