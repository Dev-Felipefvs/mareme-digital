/**
 * Molas da MAREME — inspiradas nos valores que a Apple usa (damping/response).
 * No Motion, `bounce: 0` = criticamente amortecida (sem passar do ponto) e
 * `visualDuration` ≈ "response": quanto tempo leva para chegar ao destino.
 *
 * Regra da casa: tudo sem bounce, exceto o que nasce de um gesto com impulso
 * (arrastar e soltar, chegada de notificação).
 */
export const spring = {
  /** Padrão de interface: suave, sem overshoot. */
  ui: { type: "spring", bounce: 0, visualDuration: 0.4 },
  /** Resposta ao toque/clique: rápida. */
  press: { type: "spring", bounce: 0, visualDuration: 0.18 },
  /** Entrada de conteúdo ao rolar. */
  reveal: { type: "spring", bounce: 0, visualDuration: 0.7 },
  /** Algo que chega com impulso (notificação, objeto solto). */
  arrive: { type: "spring", bounce: 0.22, visualDuration: 0.5 },
} as const;

/** Mola contínua (useSpring) praticamente sem oscilação, para valores ligados à rolagem/ponteiro. */
export const followSpring = { stiffness: 170, damping: 26, mass: 1 };
