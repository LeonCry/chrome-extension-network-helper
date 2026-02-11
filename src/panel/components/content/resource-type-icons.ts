import type { Icon } from '@tabler/icons-vue';
import {
  IconBrandParsinta,
  IconCircleDashedMinus,
  IconCirclesRelation,
  IconCodeCircle2,
  IconCube,
  IconFileText,
  IconFileTypeCss,
  IconFileTypeJs,
  IconFileTypography,
  IconList,
  IconLoader,
  IconPhoto,
} from '@tabler/icons-vue';

const resourceTypeIcon: Record<string, Icon> = {
  fetch: IconCodeCircle2,
  xhr: IconCodeCircle2,
  document: IconFileText,
  stylesheet: IconFileTypeCss,
  script: IconFileTypeJs,
  image: IconPhoto,
  font: IconFileTypography,
  media: IconBrandParsinta,
  manifest: IconList,
  websocket: IconCirclesRelation,
  other: IconCircleDashedMinus,
  wasm: IconCube,
};

export function getResourceTypeIcon(type: string | null | undefined, isPending = false) {
  if (isPending) return IconLoader;
  if (!type) return IconCircleDashedMinus;
  return resourceTypeIcon[type] || IconCircleDashedMinus;
}
