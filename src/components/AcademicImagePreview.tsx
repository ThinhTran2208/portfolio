"use client";

import Image from "next/image";
import { useId, useRef, type KeyboardEvent, type PointerEvent } from "react";
import type { AcademicImage } from "@/data/academic";

export default function AcademicImagePreview({
  title,
  metadata,
  description,
  image,
}: {
  title: string;
  metadata: string;
  description: string;
  image: AcademicImage;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  function keepPreviewFocus(event: KeyboardEvent<HTMLDialogElement>) {
    // Close is the only keyboard action in this image preview.
    if (event.key === "Tab") {
      event.preventDefault();
      closeButton.current?.focus({ preventScroll: true });
    }
  }

  function closeFromBackdrop(event: PointerEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      dialog.current?.close();
    }
  }

  return (
    <>
      <button
        type="button"
        className="academic-entry"
        aria-label={"View " + title + " image"}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <Image
          className="academic-thumbnail"
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          sizes="(max-width: 600px) 88px, 112px"
        />
        <span className="academic-entry-copy">
          <span className="academic-entry-title">{title}</span>
          <span className="academic-entry-meta">{metadata}</span>
          <span className="academic-entry-description">{description}</span>
        </span>
      </button>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-labelledby={titleId}
        onPointerDown={closeFromBackdrop}
        onKeyDown={keepPreviewFocus}
      >
        <div className="image-dialog-heading">
          <h4 id={titleId}>{title}</h4>
          <button
            ref={closeButton}
            type="button"
            className="image-dialog-close"
            aria-label="Close image preview"
            onClick={() => dialog.current?.close()}
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <Image
          className="image-dialog-picture"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          unoptimized
        />
      </dialog>
    </>
  );
}
