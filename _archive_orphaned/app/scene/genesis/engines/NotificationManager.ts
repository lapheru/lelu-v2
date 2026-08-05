/**
 * ==========================================================
 * LÉLUVERSE
 * NOTIFICATION MANAGER
 *
 * Manages notifications, alerts, AI events,
 * and interface messages.
 * ==========================================================
 */

export interface InterfaceNotification {

  id: string;

  title: string;

  message: string;

  type:
    | "info"
    | "success"
    | "warning"
    | "error";

  visible: boolean;

  timestamp: number;

  duration: number;

}

export default class NotificationManager {

  private initialized =
    false;

  private readonly notifications =
    new Map<
      string,
      InterfaceNotification
    >();

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized = true;

  }

  update(
    _delta: number,
  ): void {

    if (!this.initialized)
      return;

    const now =
      Date.now();

    for (

      const notification of

      this.notifications.values()

    ) {

      if (

        notification.visible &&

        notification.duration > 0 &&

        now >=

        notification.timestamp +

        notification.duration

      ) {

        notification.visible =
          false;

      }

    }

  }

  shutdown(): void {

    this.notifications.clear();

    this.initialized = false;

  }

  register(

    notification:
      InterfaceNotification,

  ): void {

    this.notifications.set(

      notification.id,

      notification,

    );

  }

  unregister(
    id: string,
  ): void {

    this.notifications.delete(
      id,
    );

  }

  notify(

    title: string,

    message: string,

    type:
      | "info"
      | "success"
      | "warning"
      | "error" = "info",

    duration = 5000,

  ): string {

    const id =

      `notification-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`;

    this.notifications.set(

      id,

      {

        id,

        title,

        message,

        type,

        visible: true,

        timestamp:
          Date.now(),

        duration,

      },

    );

    return id;

  }

  dismiss(
    id: string,
  ): void {

    const notification =

      this.notifications.get(id);

    if (!notification)
      return;

    notification.visible =
      false;

  }

  clear(): void {

    this.notifications.clear();

  }

  get(
    id: string,
  ):
    | InterfaceNotification
    | undefined {

    return this.notifications.get(
      id,
    );

  }

  getAll():
    InterfaceNotification[] {

    return Array.from(

      this.notifications.values(),

    );

  }

}