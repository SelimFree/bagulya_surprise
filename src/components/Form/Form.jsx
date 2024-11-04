import { useState } from "react";
import emailjs from "emailjs-com";
import "./Form.scss";
import { getEmailDataByCode } from "../../data";

function Form() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("Давай, попробуй )");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { success } = await sendEmal(code);
    console.log(success);
    if (!success) {
      setError("Неверно, попробуй еще раз )");
    } else {
      setError("Проверь свою почту )");
    }
    setLoading(false)
  };

  const sendEmal = async () => {
    const emailData = getEmailDataByCode(code);

    if (!emailData) {
      return { success: false };
    }

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("Email successfully sent!", result.text);
      setCode("")
      return { success: true };
    } catch (error) {
      console.error("Failed to send email:", error);
      return { success: false };
    }
  };

  return (
    <div className="Form">
      <h2 className="welcome-title">Привет мой цветочек :)</h2>
      <form className={`input-form${loading ? " loading" : ""}`} onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Введи пароль"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <span className="error-text">{error}</span>
        <button type="submit" disabled={loading}>Нажми на меня</button>
      </form>
    </div>
  );
}

export default Form;
