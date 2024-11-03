import type { DatacoreApi } from "api/api";
import { CanvasMetadataIndex } from "index/types/json/canvas";
import "obsidian";
import { App } from "obsidian";

/** @hidden */
declare module "obsidian" {
    interface WorkspaceLeaf {
        serialize(): {
            id: string;
            type: "leaf";
            state: {
                type: string;
                state: any;
            };
        };
        tabHeaderEl: HTMLElement;
        tabHeaderInnerTitleEl: HTMLElement;
    }
    interface View {
        getState(): any;
    }
    interface ItemView {
        titleEl: HTMLElement;
        getState(): any;
    }
    interface FileManager {
        linkUpdaters: {
            canvas: {
                canvas: {
                    index: {
                        index: CanvasMetadataIndex;
                    };
                };
            };
        };
    }
    interface Vault {
        getConfig: (conf: string) => any;
    }
    interface App {
        appId?: string;
        plugins: {
            enabledPlugins: Set<string>;
            plugins: {
                datacore?: {
                    api: DatacoreApi;
                };
            };
        };
        embedRegistry: {
            embedByExtension: {
                [key: string]: unknown;
                md: MarkdownRenderer;
            };
            getEmbedCreator: (arg: TFile) => new (
                arg2: {
                    app: App;
                    linktext: string;
                    sourcePath: string;
                    showInline: boolean;
                    depth: number;
                    containerEl: HTMLElement;
                    displayMode: boolean;
                },
                file: TFile,
                subpath?: string
            ) => FileView & { loadFile: (file: TFile) => void };
        };
    }
}

declare global {
    interface Window {
        datacore?: DatacoreApi;
        app: App;
        CodeMirror: {
            defineMode: (mode: string, conf: (config: any) => any) => unknown;
            [key: string]: any;
        };
    }
}
