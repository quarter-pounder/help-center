import React from "react";

type ParagraphBlock = { type: "paragraph"; text: string };
type HeadingBlock = { type: "heading"; level: number; text: string };
type ListBlock = { type: "list"; items: string[] };
type CodeBlock = { type: "code"; language: string; text: string };
type Block = ParagraphBlock | HeadingBlock | ListBlock | CodeBlock;

interface GuideBodyProps {
    body: unknown;
}

function normalizeBody(raw: unknown): Block[] {
    if (!raw) return [];

    if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray((parsed as any)?.blocks)
                ? ((parsed as any).blocks as Block[])
                : [];
        } catch (err) {
            console.warn("Failed to parse guide body:", err);
            return [];
        }
    }

    if (typeof raw === "object" && raw !== null) {
        const blocks = (raw as any).blocks;
        return Array.isArray(blocks) ? (blocks as Block[]) : [];
    }

    return [];
}

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
        <div className="max-w-none">
            {blocks.map((block, idx) => {
                if (block.type === "heading") {
                    const level = Math.min(6, Math.max(1, block.level));
                    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
                    return <Tag key={idx}>{block.text}</Tag>;
                }

                if (block.type === "list") {
                    return (
                        <ul key={idx} className="list-disc list-inside space-y-1">
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
                            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"
                        >
                            <code
                                className={`language-${block.language} text-gray-900 dark:text-gray-100`}
                            >
                                {block.text}
                            </code>
                        </pre>
                    );
                }

                if (block.type === "paragraph") {
                    return <p key={idx}>{block.text}</p>;
                }

                // unreachable if backend is correct
                return null;
            })}
        </div>
    );
};

export default GuideBody;