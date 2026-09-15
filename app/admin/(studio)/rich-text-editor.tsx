"use client";

import { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
    Bold,
    Heading2,
    Heading3,
    ImageIcon,
    Italic,
    Link2,
    List,
    ListOrdered,
    Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadCmsImage } from "./cover-dropzone";

function ToolbarButton({
    active,
    onClick,
    label,
    children,
}: {
    active?: boolean;
    onClick: () => void;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            className={cn(
                "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                active && "bg-primary/10 text-primary",
            )}
        >
            {children}
        </button>
    );
}

export function RichTextEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (html: string) => void;
}) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [linkOpen, setLinkOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState("https://");
    const [uploadError, setUploadError] = useState("");

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
                code: false,
                codeBlock: false,
                link: {
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: "https",
                },
            }),
            Image.configure({ inline: false }),
            Placeholder.configure({
                placeholder: "Napište, co mají rodiče vědět…",
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "aktualita-body tiptap px-4 py-4 sm:px-5",
            },
        },
        onUpdate: ({ editor: current }) => {
            onChange(current.getHTML());
        },
    });

    const insertImage = useCallback(
        async (file: File | undefined) => {
            if (!file || !editor) return;
            setUploadError("");
            try {
                const uploaded = await uploadCmsImage(file);
                editor.chain().focus().setImage({ src: uploaded.url }).run();
            } catch (error) {
                setUploadError(
                    error instanceof Error ? error.message : "Nahrání se nepovedlo.",
                );
            }
        },
        [editor],
    );

    if (!editor) {
        return (
            <div className="min-h-72 rounded-2xl border border-border bg-card px-4 py-5 text-sm text-muted-foreground">
                Připravuji psací stůl…
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5">
                <ToolbarButton
                    label="Nadpis"
                    active={editor.isActive("heading", { level: 2 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    <Heading2 className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Podnadpis"
                    active={editor.isActive("heading", { level: 3 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    <Heading3 className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Tučné"
                    active={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Kurzíva"
                    active={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Odrážky"
                    active={editor.isActive("bulletList")}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Číslovaný seznam"
                    active={editor.isActive("orderedList")}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Citace"
                    active={editor.isActive("blockquote")}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quote className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Odkaz"
                    active={editor.isActive("link")}
                    onClick={() => {
                        const previous = editor.getAttributes("link").href as
                            | string
                            | undefined;
                        setLinkUrl(previous || "https://");
                        setLinkOpen((open) => !open);
                    }}
                >
                    <Link2 className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Obrázek v textu"
                    onClick={() => fileRef.current?.click()}
                >
                    <ImageIcon className="size-4" />
                </ToolbarButton>
            </div>
            {linkOpen ? (
                <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
                    <Input
                        value={linkUrl}
                        onChange={(event) => setLinkUrl(event.target.value)}
                        placeholder="https://"
                        className="h-9 flex-1"
                    />
                    <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                            if (linkUrl.trim()) {
                                editor
                                    .chain()
                                    .focus()
                                    .extendMarkRange("link")
                                    .setLink({ href: linkUrl.trim() })
                                    .run();
                            }
                            setLinkOpen(false);
                        }}
                    >
                        Vložit
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                            editor.chain().focus().unsetLink().run();
                            setLinkOpen(false);
                        }}
                    >
                        Zrušit odkaz
                    </Button>
                </div>
            ) : null}
            <EditorContent editor={editor} />
            <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => {
                    void insertImage(event.target.files?.[0]);
                    event.target.value = "";
                }}
            />
            {uploadError ? (
                <p className="border-t border-border px-4 py-2 text-sm text-destructive">
                    {uploadError}
                </p>
            ) : null}
        </div>
    );
}
