/**
 * ==========================================================
 * LÉLUVERSE
 * MEDIA APP
 *
 * Media library for images, audio,
 * video, models, and textures.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export interface MediaAsset {

  id: string;

  name: string;

  type:
    | "image"
    | "audio"
    | "video"
    | "model"
    | "texture"
    | "document";

  path: string;

  created: number;

}

export default class MediaApp
  extends DesktopWindow {

  private readonly assets =
    new Map<
      string,
      MediaAsset
    >();

  constructor() {

    super({

      id:
        "media",

      title:
        "Media",

      visible:
        false,

      focused:
        false,

      minimized:
        false,

      maximized:
        false,

      x:
        360,

      y:
        260,

      width:
        1400,

      height:
        900,

    });

  }

  override initialize(): void {

  }

  override update(
    _delta: number,
  ): void {

  }

  override shutdown(): void {

    this.assets.clear();

  }

  add(
    asset: MediaAsset,
  ): void {

    this.assets.set(
      asset.id,
      asset,
    );

  }

  remove(
    id: string,
  ): void {

    this.assets.delete(
      id,
    );

  }

  get(
    id: string,
  ):
    | MediaAsset
    | undefined {

    return this.assets.get(
      id,
    );

  }

  getAll():
    MediaAsset[] {

    return Array.from(

      this.assets.values(),

    );

  }

  clear(): void {

    this.assets.clear();

  }

}