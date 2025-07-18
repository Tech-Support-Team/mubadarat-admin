 
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
 

import { ReturnButton } from "./components/ReturnButton";
import { LoginStateEnum, useLoginStateContext } from "./providers/LoginStateProvider";
import { useSignUP } from "@/framework/store/userStore";
import { useState } from "react";

function RegisterForm() {
	const { t } = useTranslation();
	const signUpM = useSignUP();
	const [loading, setLoading] = useState(false);
	const { loginState, backToLogin } = useLoginStateContext();

	if (loginState !== LoginStateEnum.REGISTER) return null;

	const onFinish = async (values: any) => {
		setLoading(true);
		try { 
			await signUpM(values);
			backToLogin();
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="mb-4 text-2xl font-bold xl:text-3xl">{t("sys.login.signUpFormTitle")}</div>
			<Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
				<Form.Item name="name" rules={[
					{ required: true, message: t("sys.login.namePlaceholder") },
					{ min: 2, max:50 }
				]}>
					<Input placeholder={t("sys.login.name")} />
				</Form.Item>
				<Form.Item name="email" rules={[
					{ required: true, message: t("sys.login.emailPlaceholder") },
					{ type: 'email', message: t("sys.login.emailValidation") }
				]}>
					<Input placeholder={t("sys.login.email")} />
				</Form.Item>
				<Form.Item name="password" rules={[
					{ required: true, message: t("sys.login.passwordPlaceholder") },
					{ min: 6, max:50 }
				]}>
					<Input.Password type="password" placeholder={t("sys.login.password")} />
				</Form.Item>
				<Form.Item
					name="confirmPassword"
					rules={[
						{
							required: true,
							message: t("sys.login.confirmPasswordPlaceholder"),
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error(t("sys.login.diffPwd")));
							},
						}),
					]}
				>
					<Input.Password type="password" placeholder={t("sys.login.confirmPassword")} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="w-full" loading={loading}>
						{t("sys.login.registerButton")}
					</Button>
				</Form.Item>

				<div className="mb-2 text-xs text-gray">
					<span>{t("sys.login.registerAndAgree")}</span>
					<a href="./" className="text-sm !underline">
						{t("sys.login.termsOfService")}
					</a>
					{" & "}
					<a href="./" className="text-sm !underline">
						{t("sys.login.privacyPolicy")}
					</a>
				</div>

				<ReturnButton onClick={backToLogin} />
			</Form>
		</>
	);
}

export default RegisterForm;
