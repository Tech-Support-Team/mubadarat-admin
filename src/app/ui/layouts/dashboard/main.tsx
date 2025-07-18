import { useSettings } from "@/framework/store/settingStore";
import { themeVars } from "@/framework/theme/theme.css";
import { ThemeLayout } from "@/framework/types/enum";
import { cn } from "@/framework/utils";
import { Content } from "antd/es/layout/layout";
import type { CSSProperties } from "react";
import { Outlet } from "react-router";
import { MULTI_TABS_HEIGHT } from "./config";
import MultiTabs from "./multi-tabs";
import { MultiTabsProvider } from "./multi-tabs/providers/multi-tabs-provider";

const Main = () => {
	const { themeStretch, themeLayout, multiTab } = useSettings();

	const mainStyle: CSSProperties = {
		paddingTop: multiTab ? MULTI_TABS_HEIGHT : 0,
		background: themeVars.colors.background.default,
		transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		width: "100%",
	};

	return (
		<Content style={mainStyle} className="flex">
			<div className="flex-grow overflow-auto size-full">
				<div
					className={cn(
						"m-auto size-full flex-grow sm:p-2",
						themeStretch ? "" : "xl:max-w-screen-xl",
						themeLayout === ThemeLayout.Horizontal ? "flex-col" : "flex-row",
					)}
				>
					{multiTab ? (
						<MultiTabsProvider>
							<MultiTabs />
						</MultiTabsProvider>
					) : (
						<Outlet />
					)}
				</div>
			</div>
		</Content>
	);
};

export default Main;
