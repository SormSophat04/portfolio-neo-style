import type { CVDocument } from '../types';

// Standard minimal PDF data URI template
// Generates a valid downloadable PDF for Sorm Sophat
export const SAMPLE_PDF_DATA_URI =
  'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iaiA8PC9UeXBlIC9DYXRhbG9nIC9QYWdlcyAyIDAgUj4+IGVuZG9iagoyIDAgb2JqIDw8L1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDE+PiBlbmRvYmoKMyAwIG9iaiA8PC9UeXBlIC9QYWdlIC9QYXJlbnQgMiAwIFIgL01lZGlhQm94IFswIDAgNjEyIDc5Ml0gL0NvbnRlbnRzIDQgMCBSIC9SZXNvdXJjZXMgPDwgL0ZvbnQgPDwgL0YxIDUgMCBSID4+ID4+ID4+IGVuZG9iago0IDAgb2JqIDw8L0xlbmd0aCA1OD4+IHN0cmVhbQpCVCAvRjEgMjQgVGYgNzIgNzIwIFRkIChTT1JNIFNPUEhBVCAtIENPUkUgUkVTVU1FKSBUaiBFVAplbmRzdHJlYW0gZW5kb2JqCjUgMCBvYmogPDwvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL0Jhc2VGb250IC9IZWx2ZXRpY2E+PiBlbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDExNyAwMDAwMCBuIAowMDAwMDAwMjM0IDAwMDAwIG4gCjAwMDAwMDAzNDIgMDAwMDAgbiAKdHJhaWxlciA8PC9TaXplIDYgL1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKNDIxCiUlRU9GCg==';

export const INITIAL_CVS: CVDocument[] = [
  {
    id: 'cv-backend-specialist',
    title: 'Software Engineer (Backend Focus)',
    targetRole: 'Backend Engineer / API Developer',
    fileName: 'Sorm_Sophat_Backend_Engineer_CV.pdf',
    fileUrl: SAMPLE_PDF_DATA_URI,
    fileSize: '142 KB',
    uploadedAt: '2025-02-15',
    isDefault: true,
    language: 'English',
    description:
      'Tailored for Enterprise Backend roles. Highlights Spring Boot microservices, Kafka event streaming, PostgreSQL/Oracle schemas, and LOLC Microfinance Bank internship.',
  },
  {
    id: 'cv-fullstack-mobile',
    title: 'Full-Stack & Mobile Developer',
    targetRole: 'Full-Stack Developer / Flutter Engineer',
    fileName: 'Sorm_Sophat_FullStack_Mobile_CV.pdf',
    fileUrl: SAMPLE_PDF_DATA_URI,
    fileSize: '158 KB',
    uploadedAt: '2025-02-10',
    isDefault: false,
    language: 'English',
    description:
      'Tailored for Full-Stack & Cross-Platform roles. Highlights Flutter mobile apps, React web interfaces, state management, and end-to-end API integrations.',
  },
  {
    id: 'cv-fintech-systems',
    title: 'Fintech & Banking Systems Intern',
    targetRole: 'Junior Software Engineer (Fintech)',
    fileName: 'Sorm_Sophat_Fintech_Internship_CV.pdf',
    fileUrl: SAMPLE_PDF_DATA_URI,
    fileSize: '135 KB',
    uploadedAt: '2025-01-20',
    isDefault: false,
    language: 'English',
    description:
      'Highlights banking technology experience at LOLC Microfinance Bank, transaction safety, double-entry accounting models, and enterprise software documentation.',
  },
];
