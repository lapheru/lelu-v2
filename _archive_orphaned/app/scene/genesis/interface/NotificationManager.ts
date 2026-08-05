/**
 * ==========================================================
 * LÉLUVERSE
 * NOTIFICATION MANAGER
 *
 * Manages interface notifications.
 * ==========================================================
 */

export interface InterfaceNotification {

  id: string;

  title: string;

  message: string;

  created: number;

  duration: number;

  read: boolean;

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

    this.initialized =
      true;

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

        notification.duration > 0 &&

        now - notification.created >=

        notification.duration

      ) {

        this.notifications.delete(
          notification.id,
        );

      }

    }

  }

  shutdown(): void {

    this.notifications.clear();

    this.initialized =
      false;

  }

  push(
    notification: InterfaceNotification,
  ): void {

    this.notifications.set(

      notification.id,

      notification,

    );

  }

  remove(
    id: string,
  ): void {

    this.notifications.delete(
      id,
    );

  }

  clear(): void {

    this.notifications.clear();

  }

  markRead(
    id: string,
  ): void {

    const notification =

      this.notifications.get(id);

    if (!notification)
      return;

    notification.read =
      true;

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