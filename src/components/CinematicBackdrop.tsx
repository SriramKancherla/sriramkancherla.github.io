/** Hero atmosphere — Ken Burns teal/orange gradients. */
export const CinematicBackdrop = () => (
  <div className="cinematic-backdrop absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="cinematic-backdrop__ken cinematic-backdrop__ken--teal ken-burns" />
    <div className="cinematic-backdrop__ken cinematic-backdrop__ken--orange ken-burns-reverse" />
    <div className="cinematic-backdrop__vignette" />
  </div>
);
