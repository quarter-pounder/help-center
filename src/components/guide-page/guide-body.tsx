import React from "react";

type ParagraphBlock = { type: "paragraph"; text: string };
type HeadingBlock = { type: "heading"; level: number; text: string };
type ListBlock = { type: "list"; items: string[] };
type CodeBlock = { type: "code"; language: string; text: string };
type Block = ParagraphBlock | HeadingBlock | ListBlock | CodeBlock;

interface GuideBodyProps {
    body: unknown;
}

const urlPattern = /https?:\/\/[^\s)]+/g;

function renderTextWithLinks(text: string): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = urlPattern.exec(text)) !== null) {
        const url = match[0];

        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }

        nodes.push(
            <a
                key={`${url}-${match.index}`}
                href={url}
                className="text-blue-600 hover:underline dark:text-blue-400"
                target="_blank"
                rel="noreferrer"
            >
                {url}
            </a>,
        );

        lastIndex = match.index + url.length;
    }

    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }

    return nodes.length > 0 ? nodes : [text];
}

function normalizeBody(raw: unknown): Block[] {
    if (!raw) return [];

    let blocks: unknown;

    if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw);
            blocks = (parsed as any)?.blocks;
        } catch {
            console.warn("Failed to parse guide body");
            return [];
        }
    } else if (typeof raw === "object") {
        blocks = (raw as any).blocks;
    }

    if (!Array.isArray(blocks)) return [];

    // remove empty paragraph blocks
    const filtered = (blocks as Block[]).filter((b) => {
        if (b.type === "paragraph") {
            return b.text.trim().length > 0;
        }
        return true;
    });

    return filtered;
}

const headingSizes: Record<number, string> = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
};

const GuideBody = ({ body }: GuideBodyProps) => {
    const blocks = normalizeBody(body);

    if (blocks.length === 0) {
        return (
            <p className="max-w-none text-gray-400 dark:text-gray-500 italic">
                No content available.
            </p>
        );
    }

    return (
        <div className="max-w-none space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {blocks.map((block, idx) => {
                if (block.type === "heading") {
                    const level = Math.min(6, Math.max(1, block.level));
                    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
                    const sizeClass = headingSizes[level] || headingSizes[3];
                    return (
                        <Tag
                            key={idx}
                            className={`${sizeClass} font-semibold text-gray-900 dark:text-white`}
                        >
                            {block.text}
                        </Tag>
                    );
                }

                if (block.type === "list") {
                    return (
                        <ul key={idx} className="list-disc pl-6 space-y-2">
                            {block.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    );
                }

                if (block.type === "code") {
                    return (
                        <pre
                            key={idx}
                            className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-900 dark:text-gray-100"
                        >
                            <code className={`language-${block.language}`}>
                                {block.text}
                            </code>
                        </pre>
                    );
                }

                if (block.type === "paragraph") {
                    return (
                        <p key={idx} className="text-base">
                            {renderTextWithLinks(block.text)}
                        </p>
                    );
                }

                return null;
            })}
        </div>
    );
};

export default GuideBody;
