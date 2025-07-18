import { Divider, Space, type MenuProps } from "antd";
import Dropdown, { type DropdownProps } from "antd/es/dropdown/dropdown";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { useRouter } from "@/framework/router/hooks";
import { useUserActions, useUserInfo } from "@/framework/store/userStore";
import { useTheme } from "@/framework/theme/hooks"; 
import { useLoginStateContext } from "@/app/ui/pages/sys/auth/providers/LoginStateProvider";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
	const { replace } = useRouter();
	const { username, email, avatar } = useUserInfo();
	const { clearUserInfoAndToken } = useUserActions();
	const { backToLogin } = useLoginStateContext();
	const { t } = useTranslation();
	const logout = () => {
		try {
			clearUserInfoAndToken();
			backToLogin();
		} catch (error) {
			console.log(error);
		} finally {
			replace("/login");
		}
	};
	const {
		themeVars: { colors, borderRadius, shadows },
	} = useTheme();

	const contentStyle: React.CSSProperties = {
		backgroundColor: colors.background.default,
		borderRadius: borderRadius.lg,
		boxShadow: shadows.dropdown,
	};

	const menuStyle: React.CSSProperties = {
		boxShadow: "none",
	};

	const dropdownRender: DropdownProps["dropdownRender"] = (menu) => (
		<div style={contentStyle}>
			<div className="flex flex-col items-start p-4">
				<div>{username}</div>
				<div className="text-gray">{email}</div>
			</div>
			<Divider style={{ margin: 0 }} />
			{React.cloneElement(menu as React.ReactElement<any>, { style: menuStyle })}
		</div>
	);

	const items: MenuProps["items"] = [
		{
			label: <NavLink to={HOMEPAGE}>{t("sys.menu.dashboard")}</NavLink>,
			key: "1",
		},
		{
			label: <NavLink to="/management/user/account">{t("sys.menu.account")}</NavLink>,
			key: "3",
		},
		{ type: "divider" },
		{
			label: (
				<button className="font-bold text-warning" type="button">
					{t("sys.login.logout")}
				</button>
			),
			key: "4",
			onClick: logout,
		},
	];

	return (
		<Dropdown menu={{ items }} trigger={["click"]} dropdownRender={dropdownRender}>
			<button type="button" onClick={(e) => e.preventDefault()} className="h-10 w-10 transform-none px-0 hover:scale-105">
				<Space>
				<img className="h-8 w-8 rounded-full" src={avatar} alt="" />
				</Space>
			</button>
			{/* <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
				<img className="h-8 w-8 rounded-full" src={avatar} alt="" />
			</IconButton> */}
		</Dropdown>
	);
}
