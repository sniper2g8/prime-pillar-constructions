export type Project = {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: 'mining' | 'oil_gas' | 'energy' | 'government' | 'commercial' | 'infrastructure';
  location?: string;
  year?: number;
  status: 'completed' | 'ongoing' | 'upcoming';
  short_description: string;
  full_description?: string;
  scope?: string;
  featured: boolean;
  thumbnail_url?: string;
  gallery: string[];
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  full_description?: string;
  features: string[];
  image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

export type Equipment = {
  id: string;
  name: string;
  category?: string;
  quantity: number;
  description?: string;
  specifications: Record<string, any>;
  image_url?: string;
  is_available: boolean;
  created_at: string;
};

export type Inquiry = {
  id: string;
  type: 'contact' | 'quote' | 'equipment';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  services_interested: string[];
  project_details: Record<string, any>;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  title?: string;
  bio?: string;
  qualifications?: string;
  experience?: string;
  image_url?: string;
  is_director: boolean;
  display_order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  company?: string;
  role?: string;
  content: string;
  rating?: number;
  image_url?: string;
  is_featured: boolean;
  created_at: string;
};