import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./Form.scss";
import { getEmailDataByCode } from "../../data";
import Counter from "../Counter/Counter";

function Form() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("Давай, попробуй )");
  const [loading, setLoading] = useState(false);
  const [beating, setBeating] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const voiceRef = useRef();
  const voice_number = 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { success, error } = await sendEmal(code);
    console.log(success);
    if (!success) {
      setError("Неверно, попробуй еще раз )");
    } else {
      setError(error);
    }
    setLoading(false);
    voiceRef.current
      .play()
      .catch((error) => console.error("Error playing audio:", error));
  };

  const handleAudio = async () => {
    setBeating(true);
    if (voiceRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setAudioSrc(
        `assets/audio/voice_${Math.floor(Math.random() * voice_number) + 1}.m4a`
      );
    }
    setBeating(false);
  };

  const sendEmal = async () => {
    const emailData = getEmailDataByCode(code);

    if (!emailData) {
      setAudioSrc(`assets/audio/voice_no.m4a`);
      return { success: false };
    }

    switch (emailData.type) {
      case "email":
        try {
          const result = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            emailData.template_id,
            emailData,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );

          console.log("Email successfully sent!", result.text);
          setAudioSrc(`assets/audio/voice_yes.m4a`);
          setCode("");
          return { success: true, error: "Проверь свою почту )" };
        } catch (error) {
          console.error("Failed to send email:", error);
          return { success: false };
        }
    }
  };

  const handleAudioLoaded = () => {
    if (voiceRef.current) {
      voiceRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  };

  return (
    <div className="Form">
      <h2 className="welcome-title">Привет мой цветочек :)</h2>
      <Counter />
      <form
        className={`input-form${loading ? " loading" : ""}`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Введи пароль"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <span className="error-text">{error}</span>
        <button type="submit" disabled={loading}>
          Нажми на меня
        </button>
      </form>
      <div
        className={`heart${beating ? " beating" : ""}`}
        onClick={handleAudio}
      >
        ❤️
      </div>
      <audio
        id="voice"
        ref={voiceRef}
        src={audioSrc}
        onLoadedData={handleAudioLoaded}
      ></audio>
    </div>
  );
}

export default Form;
