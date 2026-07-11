/** Soft mesh blob background — cinematic teal & orange palette. */
export const AuroraBackground = () => (
  <div className="aurora-bg absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <div className="aurora-bg__base" />
    <div className="aurora-bg__mesh">
      <div className="aurora-bg__orb aurora-bg__orb--1" />
      <div className="aurora-bg__orb aurora-bg__orb--2" />
      <div className="aurora-bg__orb aurora-bg__orb--3" />
      <div className="aurora-bg__orb aurora-bg__orb--4" />
      <div className="aurora-bg__orb aurora-bg__orb--5" />
    </div>
    <div className="aurora-bg__veil" />
    <div className="aurora-bg__noise" />
  </div>
);
