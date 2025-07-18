import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { FontFamilyPreset, typographyTokens } from "@/framework/theme/tokens/typography";
import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from "@/framework/types/enum";

import defaultSettings from "@/app/config/theme"
export type SettingsType = {
	themeColorPresets: ThemeColorPresets;
	themeMode: ThemeMode;
	themeLayout: ThemeLayout;
	themeStretch: boolean;
	breadCrumb: boolean;
	multiTab: boolean;
	darkSidebar: boolean;
	fontFamily: string;
	fontSize: number;
	direction: "ltr" | "rtl";
};
type SettingStore = {
	settings: SettingsType;
	actions: {
		setSettings: (settings: SettingsType) => void;
		clearSettings: () => void;
	};
};

const useSettingStore = create<SettingStore>()(
	persist(
		(set) => ({
			settings: defaultSettings ?? {
				themeColorPresets: ThemeColorPresets.Default,
				themeMode: ThemeMode.Light,
				themeLayout: ThemeLayout.Vertical,
				themeStretch: false,
				breadCrumb: true,
				multiTab: true,
				darkSidebar: false,
				fontFamily: FontFamilyPreset.rubik,
				fontSize: Number(typographyTokens.fontSize.sm),
				direction: "rtl",
			},
			actions: {
				setSettings: (settings) => {
					set({ settings });
				},
				clearSettings() {
					useSettingStore.persist.clearStorage();
				},
			},
		}),
		{
			name: StorageEnum.Settings, // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({ [StorageEnum.Settings]: state.settings }),
		},
	),
);

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);

export default useSettingStore;