export interface DirectorProfile {
  slug: string;
  publicName: string;
  title: string;
  portraitSrc: string;
  portraitAlt: string;
  shortBiography: string;
  fullBiography: string[];
  previousExperience: string[];
  qualifications: string[];
  professionalProfileUrl?: string;
}
