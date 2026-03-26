import type { Component } from "svelte";
import { writable } from "svelte/store";

export type ModalProps = Record<string, unknown>;

export type ModalComponentType<Props extends ModalProps = ModalProps> =
  Component<Props>;

export type ModalOptions<Props extends ModalProps = ModalProps> = {
  component: ModalComponentType<Props>;
  props?: Props;
  title?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  maxWidth?: string;
};

export type ModalState = {
  open: boolean;
  component: ModalComponentType | null;
  props: ModalProps;
  title: string;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  maxWidth: string;
};

const initialModalState: ModalState = {
  open: false,
  component: null,
  props: {},
  title: "",
  closeOnBackdrop: true,
  closeOnEscape: true,
  maxWidth: "min(960px, calc(100vw - 32px))",
};

const modalStore = writable<ModalState>(initialModalState);

function startModal<Props extends ModalProps>(options: ModalOptions<Props>) {
  modalStore.set({
    open: true,
    component: options.component as ModalComponentType,
    props: (options.props ?? {}) as ModalProps,
    title: options.title ?? "",
    closeOnBackdrop: options.closeOnBackdrop ?? true,
    closeOnEscape: options.closeOnEscape ?? true,
    maxWidth: options.maxWidth ?? initialModalState.maxWidth,
  });
}

function closeModal() {
  modalStore.set(initialModalState);
}

function updateModalProps(nextProps: ModalProps) {
  modalStore.update((state) => {
    if (!state.open) {
      return state;
    }

    return {
      ...state,
      props: {
        ...state.props,
        ...nextProps,
      },
    };
  });
}

export const modalContext = {
  subscribe: modalStore.subscribe,
  startModal,
  closeModal,
  updateModalProps,
};

export default modalContext;
