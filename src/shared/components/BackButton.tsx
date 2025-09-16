"use client";

import "./BackButton.scss";

import { useNavigate } from "react-router";

interface BackButtonProps {
  to?: string;
  label?: string;
}

export function BackButton({ to, label = "Volver" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="back-button" onClick={handleClick} type="button">
      <span className="arrow">←</span>
      <span className="text">{label}</span>
    </button>
  );
}
