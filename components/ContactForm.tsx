import Link from "next/link";
import React, { FC } from "react";
import { LayoutProps } from "../types/types";
import { useState } from "react";
import Modal from "./Modal";
import { motion, useAnimation } from "framer-motion";

type FormData = {
  name: string;
  company: string;
  email: string;
  tel: string;
  contactType: string;
  message: string;
};

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    tel: "",
    contactType: "",
    message: "",
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const controls = useAnimation();

  const closeModalHandler = (e: any) => {
    setIsOpenModal(false);
  };

  const handleChangeForm = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendForm = async (e: any) => {
    console.log("start sendForm");
    e.preventDefault();
    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const telValid = /^[0-9]{9,20}$/;
    if (
      !formData.name ||
      !formData.company ||
      !formData.email ||
      !formData.tel ||
      !formData.message
    ) {
      setModalText("未入力入力項目があります。");
      setIsOpenModal(true);
      return;
    } else if (!emailValid.test(formData.email)) {
      setModalText("メールアドレスが正しくありません。");
      setIsOpenModal(true);
      return;
    } else if (!telValid.test(formData.tel)) {
      setModalText("電話番号が正しくありません。");
      setIsOpenModal(true);
      return;
    }
    controls.start({ y: [0, -1000] });
    const res = await fetch("/api/send", {
      body: JSON.stringify({
        message: `${formData.name}様 

問い合わせありがとうございます。
こちらのメールは自動配信です。
フォームへの記載に誤りがないか、今一度ご確認ください。

【入力内容】
■氏名：${formData.name} 
■会社名：${formData.company} 
■メールアドレス：${formData.email} 
■電話番号：${formData.tel} 
■問い合わせの種別：${formData.contactType} 
■お問い合わせ内容：
${formData.message}

修正点や追加でのご質問などございましたらこちらのメールにご返信ください。
内容確認のうえ3営業日以内に回答いたします。

SO RESEARCH
      `,
        email: formData.email,
      }),
      // email: {e.target.email.value},
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (res.ok) {
      console.log(res.ok);
      setModalText(
        "お問い合わせありがとうございます。入力されたアドレス宛にメールを自動送信しました。入力内容をご確認ください。"
      );
    } else {
      setModalText(
        "送信に失敗しました。お手数ですが再入力し再びお問い合わせください。"
      );
    }
    setIsOpenModal(true);
  };

  return (
    <motion.div animate={controls} className="bg-white m-16 h-max">
      <h2 className="font-bold text-4xl futura p-4 pb-0">CONTACT</h2>
      <div className="p-6 grid gap-6 max-w-md mx-auto xs:w-[90vw] sm:w-[40vw]">
        <div className="form-item">
          <label>
            <span className="" data-name="name">
              <input
                type="text"
                name="name"
                className="p-2 w-full"
                aria-required="true"
                aria-invalid="false"
                placeholder="氏名"
                onChange={handleChangeForm}
              />
            </span>
          </label>
        </div>
        <div className="form-item">
          <label>
            <span className="" data-name="company">
              <input
                type="text"
                name="company"
                className="p-2 w-full"
                aria-required="true"
                aria-invalid="false"
                placeholder="会社名 ※又は個人名"
                onChange={handleChangeForm}
              />
            </span>
          </label>
        </div>
        <div className="form-item">
          <label>
            <span className="" data-name="email">
              <input
                type="email"
                name="email"
                className="p-2 w-full"
                aria-required="true"
                aria-invalid="false"
                placeholder="メールアドレス"
                onChange={handleChangeForm}
              />
            </span>
          </label>
        </div>
        <div className="form-item">
          <label>
            <span className="" data-name="tel">
              <input
                type="tel"
                name="tel"
                className="p-2 w-full"
                aria-required="true"
                pattern="^[0-9]{9,}$"
                placeholder="電話番号(ハイフン不要)"
                onChange={handleChangeForm}
              />
            </span>
          </label>
        </div>
        <div className="form-item category  selectBox">
          <label className="">
            <span className="" data-name="contactType">
              <select
                name="contactType"
                className={`${
                  formData.contactType ? "formValid" : ""
                } p-2 w-full`}
                aria-required="true"
                aria-invalid="false"
                placeholder="お問い合わせ種別"
                onChange={handleChangeForm}
              >
                <option value={""}>お問い合わせ種別</option>
                <option value="制作に関するご相談">制作に関するご相談</option>
                <option value="その他お問い合わせ">その他お問い合わせ</option>
              </select>
            </span>
          </label>
        </div>
        <div className="form-item">
          <label>
            <span className="" data-name="message">
              <textarea
                name="message"
                className="p-2 w-full h-40"
                aria-required="true"
                aria-invalid="false"
                placeholder="お問い合わせ内容を入力してください。"
                onChange={handleChangeForm}
              />
            </span>
          </label>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          className="bg-def2 text-white py-2 px-5 w-max mx-auto"
          onClick={sendForm}
        >
          送信
        </motion.button>
      </div>

      {isOpenModal && (
        <Modal close={closeModalHandler} modalText={modalText}></Modal>
      )}
    </motion.div>
  );
};

export default ContactForm;
