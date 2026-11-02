export interface DirectorProfile {
  slug: string;
  publicName: string;
  shortBiography: string;
  fullBiography: string[];
  previousExperience: string[];
  qualifications: string[];
  approvedTitle?: string;
  portraitSrc?: string;
  portraitAlt?: string;
  professionalProfileUrl?: string;
}
