'use client';
import React from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { useState, useRef } from 'react';

const subNav = [
  { label: 'Details & Settings', path: 'details' },
  { label: 'Spaces', path: 'spaces' },
  { label: 'Analytics & Reports', path: 'analytics' },
];

const initialVenueData = {
  name: 'Grand Hall',
  type: 'Banquet Hall',
  address: '123 Main St, Cityville',
  contactPhone: '+1 555-123-4567',
  contactEmail: 'info@grandhall.com',
  description: 'A beautiful venue for weddings, galas, and corporate events. Features a spacious main hall, modern amenities, and a dedicated staff.',
  photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  operatingHours: '9:00 AM - 11:00 PM',
  timeZone: 'America/New_York',
  checkIn: '2:00 PM',
  checkOut: '11:00 PM',
  maxCapacity: 300,
  seatedCapacity: 200,
  banquetCapacity: 150,
  parkingCapacity: 50,
  dimensions: { length: 40, width: 20, height: 6, totalArea: 800 },
  powerSupply: '100A, 3-phase',
  outlets: '20 standard, 4 industrial',
  generator: 'Yes (50kW backup)',
  internet: 'Fiber, 500Mbps, guest WiFi',
  lighting: 'LED, dimmable, 4 zones',
  av: 'In-house audio, 2 projectors, 4 wireless mics',
  hvac: 'Central HVAC, programmable',
  amenities: ['WiFi', 'AV', 'Parking', 'Kitchen', 'Bar', 'Accessibility'],
  accessibility: 'Wheelchair ramps, accessible restrooms',
  bookingPolicy: '50% deposit required. Free cancellation up to 30 days before event.',
  houseRules: 'No outside catering. No smoking indoors. Music off by midnight.',
  insurance: 'Event insurance required for all bookings.',
  manager: 'Jane Doe',
  supportContact: '+1 555-987-6543',
  floorPlan: '',
  gallery: [] as string[],
};

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: '🏢' },
  { id: 'technical', label: 'Technical', icon: '⚡' },
  { id: 'capacity', label: 'Capacity', icon: '👥' },
  { id: 'policies', label: 'Policies', icon: '📋' },
  { id: 'contact', label: 'Contact', icon: '📞' },
];

// Demo spaces data
const initialSpaces = [
  {
    id: 1,
    name: 'Main Hall',
    type: 'Banquet',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    capacity: 200,
    status: 'Available',
    amenities: ['WiFi', 'AV', 'Kitchen'],
    description: 'Spacious main hall for large events.'
  },
  {
    id: 2,
    name: 'Garden Room',
    type: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    capacity: 80,
    status: 'Booked',
    amenities: ['WiFi', 'Garden Access'],
    description: 'Beautiful garden room for ceremonies.'
  },
  {
    id: 3,
    name: 'Rooftop',
    type: 'Terrace',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
    capacity: 120,
    status: 'Maintenance',
    amenities: ['AV', 'Bar'],
    description: 'Rooftop terrace with city views.'
  },
];

const spaceTypes = ['Banquet', 'Outdoor', 'Terrace', 'Conference', 'Lounge'];
const statusOptions = ['Available', 'Booked', 'Maintenance'];
const amenityOptions = ['WiFi', 'AV', 'Kitchen', 'Garden Access', 'Bar', 'Stage', 'Parking'];

type Space = {
  id?: number;
  name: string;
  type: string;
  image: string;
  capacity: number;
  status: string;
  amenities: string[];
  description: string;
};

interface SpaceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (space: Space) => void;
  initialData: Space;
}

function SpaceModal({ open, onClose, onSave, initialData }: SpaceModalProps) {
  const [form, setForm] = useState<Space>(initialData);
  const isEdit = !!initialData?.id;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'capacity' ? Number(value) : value }));
  }
  function handleAmenityChange(amenity: string) {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(amenity)
        ? f.amenities.filter((a: string) => a !== amenity)
        : [...f.amenities, amenity],
    }));
  }
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setForm(f => ({ ...f, image: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave(form);
  }
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(44,62,80,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(31,38,135,0.12)', padding: 28, width: 480, maxWidth: '95vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', overflowY: 'auto' }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: '#6a82fb', marginBottom: 12 }}>{isEdit ? 'Edit Space' : 'Add Space'}</div>
        {/* Image Upload */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: 6 }} />
          {form.image && <img src={form.image} alt="space" style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 8, marginBottom: 6 }} />}
        </div>
        {/* Name & Type */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 2 }}>
            <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2, display: 'block' }}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ececec', width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2, display: 'block' }}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ececec', width: '100%' }}>
              {spaceTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        {/* Capacity & Status */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2, display: 'block' }}>Capacity</label>
            <input name="capacity" type="number" value={form.capacity} onChange={handleChange} required min={1} style={{ padding: 8, borderRadius: 6, border: '1px solid #ececec', width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2, display: 'block' }}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ececec', width: '100%' }}>
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        {/* Amenities */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2, display: 'block' }}>Amenities</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {amenityOptions.map(a => (
              <label key={a} style={{ fontSize: 14, color: '#232323', background: form.amenities.includes(a) ? '#6a82fb22' : '#ececec', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', marginBottom: 2 }}>
                <input type="checkbox" checked={form.amenities.includes(a)} onChange={() => handleAmenityChange(a)} style={{ marginRight: 4 }} />{a}
              </label>
            ))}
          </div>
        </div>
        {/* Description */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2, display: 'block' }}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} style={{ padding: 8, borderRadius: 6, border: '1px solid #ececec', width: '100%' }} />
        </div>
        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
          <button type="button" onClick={onClose} style={{ background: '#ececec', color: '#232323', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
          <button type="submit" style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>{isEdit ? 'Save' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
}

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ cursor: 'pointer', fontWeight: 600, fontSize: 17, color: '#6a82fb', marginBottom: 8 }} onClick={() => setOpen(o => !o)}>
        {title} {open ? '▲' : '▼'}
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}

export default function VenuesPage() {
  const [venue, setVenue] = useState<typeof initialVenueData>(initialVenueData);
  const [editVenue, setEditVenue] = useState<typeof initialVenueData>(initialVenueData);
  const [editing, setEditing] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState(subNav[0].path); // Add active sub nav state
  const [activeTab, setActiveTab] = useState('basic');
  // Spaces state
  const [spaces, setSpaces] = useState<Space[]>(initialSpaces);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Space | null>(null);
  const [editSpaceId, setEditSpaceId] = useState<number|null>(null);
  const [editSpaceData, setEditSpaceData] = useState<any>(null);
  const [menuOpenId, setMenuOpenId] = useState<number|null>(null);
  const menuRefs = useRef<{[key:number]: HTMLDivElement|null}>({});

  // Handle edit
  const handleEditSpace = (space: any) => {
    setEditSpaceId(space.id);
    setEditSpaceData({ ...space });
  };
  const handleEditSpaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditSpaceData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleEditSpaceSave = () => {
    setSpaces(spaces.map(s => s.id === editSpaceId ? { ...s, ...editSpaceData } : s));
    setEditSpaceId(null);
    setEditSpaceData(null);
  };
  const handleEditSpaceCancel = () => {
    setEditSpaceId(null);
    setEditSpaceData(null);
  };
  // Define handleDeleteSpace only once
  function handleDeleteSpace(id: number) {
    if (window.confirm('Delete this space?')) {
      setSpaces(spaces => spaces.filter(s => s.id !== id));
    }
  }
  // Handle menu
  const handleMenuToggle = (id: number) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };
  // Close menu on click outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuOpenId !== null && menuRefs.current[menuOpenId] && !(menuRefs.current[menuOpenId] as any).contains(e.target)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpenId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setEditVenue(prev => ({ ...prev, [name]: value }));
  }

  function handleDimensionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEditVenue(prev => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: value },
    }));
  }

  function handleSave() {
    setVenue(editVenue);
    setEditing(false);
  }

  function handleCancel() {
    setEditVenue(venue);
    setEditing(false);
  }

  function handleAddSpace() {
    setModalData({
      id: undefined,
      name: '',
      type: spaceTypes[0],
      image: '',
      capacity: 1,
      status: statusOptions[0],
      amenities: [],
      description: '',
    });
    setModalOpen(true);
  }
  function handleEditSpaceModal(space: Space) {
    setModalData(space);
    setModalOpen(true);
  }
  function handleSaveSpace(data: Space) {
    if (data.id) {
      setSpaces(spaces => spaces.map(s => s.id === data.id ? { ...data } : s));
    } else {
      setSpaces(spaces => [...spaces, { ...data, id: Date.now() }]);
    }
    setModalOpen(false);
    setModalData(null);
  }

  // Inline editing controls at the top of the card
  const renderEditControls = () => (
    <div style={{ display: 'flex', gap: 12, marginBottom: 24, justifyContent: 'flex-end' }}>
      <button onClick={handleSave} style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Save Changes</button>
      <button onClick={handleCancel} style={{ background: '#ececec', color: '#232323', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
    </div>
  );

  // Render fields as inputs or text based on editing state
  type BasicInfoField = 'name' | 'type' | 'address' | 'description' | 'operatingHours' | 'timeZone' | 'checkIn' | 'checkOut';
  type TechnicalField = 'powerSupply' | 'outlets' | 'generator' | 'internet' | 'lighting' | 'av' | 'hvac' | 'amenities' | 'accessibility';
  type CapacityField = 'maxCapacity' | 'seatedCapacity' | 'banquetCapacity' | 'parkingCapacity' | 'length' | 'width' | 'height' | 'totalArea';
  type PoliciesField = 'bookingPolicy' | 'houseRules' | 'insurance';
  type ContactField = 'contactPhone' | 'contactEmail' | 'manager' | 'supportContact';

  // Reduce marginBottom for fields
  const renderField = (
    label: string,
    value: string,
    name: BasicInfoField | TechnicalField,
    type: 'input' | 'textarea' = 'input',
    extraProps: any = {}
  ) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ fontWeight: 600, color: '#232323', display: 'block', marginBottom: 2 }}>{label}</label>
      {editing ? (
        type === 'input' ? (
          <input name={name} value={editVenue[name] ?? ''} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e0e0', color: '#232323', background: '#fff', fontSize: 15 }} {...extraProps} />
        ) : (
          <textarea name={name} value={editVenue[name] ?? ''} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e0e0', color: '#232323', background: '#fff', fontSize: 15, minHeight: 48 }} {...extraProps} />
        )
      ) : (
        <div style={{ fontSize: 15, color: '#232323', padding: '6px 0' }}>{value}</div>
      )}
    </div>
  );

  const renderCapacityField = (
    label: string,
    value: number,
    name: Exclude<CapacityField, 'length' | 'width' | 'height' | 'totalArea'>,
  ) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ fontWeight: 600, color: '#232323', display: 'block', marginBottom: 2 }}>{label}</label>
      {editing ? (
        <input
          name={name}
          value={editVenue[name] ?? ''}
          onChange={handleChange}
          type="number"
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e0e0', color: '#232323', background: '#fff', fontSize: 15 }}
        />
      ) : (
        <div style={{ fontSize: 15, color: '#232323', padding: '6px 0' }}>{value}</div>
      )}
    </div>
  );

  const renderDimensionField = (
    label: string,
    value: number,
    name: 'length' | 'width' | 'height' | 'totalArea',
  ) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ fontWeight: 600, color: '#232323', display: 'block', marginBottom: 2 }}>{label}</label>
      {editing ? (
        <input
          name={name}
          value={editVenue.dimensions[name] ?? ''}
          onChange={handleDimensionChange}
          type="number"
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e0e0', color: '#232323', background: '#fff', fontSize: 15 }}
        />
      ) : (
        <div style={{ fontSize: 15, color: '#232323', padding: '6px 0' }}>{value}</div>
      )}
    </div>
  );

  const renderPoliciesField = (
    label: string,
    value: string,
    name: PoliciesField,
  ) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontWeight: 600, color: '#232323', display: 'block', marginBottom: 2 }}>{label}</label>
      {editing ? (
        <textarea
          name={name}
          value={editVenue[name] ?? ''}
          onChange={handleChange}
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e0e0', color: '#232323', background: '#fff', fontSize: 15, minHeight: 48 }}
          placeholder={
            name === 'bookingPolicy' ? 'e.g. 50% deposit required. Free cancellation up to 30 days before event.' :
            name === 'houseRules' ? 'e.g. No outside catering. No smoking indoors. Music off by midnight.' :
            'e.g. Event insurance required for all bookings.'
          }
        />
      ) : (
        <div style={{ fontSize: 15, color: '#232323', padding: '6px 0', whiteSpace: 'pre-line' }}>{value}</div>
      )}
    </div>
  );

  const renderContactField = (
    label: string,
    value: string,
    name: ContactField,
    type: 'input' | 'email' | 'tel' = 'input',
    extraProps: any = {}
  ) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ fontWeight: 600, color: '#232323', display: 'block', marginBottom: 2 }}>{label}</label>
      {editing ? (
        <input
          name={name}
          value={editVenue[name] ?? ''}
          onChange={handleChange}
          type={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'text'}
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e0e0', color: '#232323', background: '#fff', fontSize: 15 }}
          {...extraProps}
        />
      ) : (
        <div style={{ fontSize: 15, color: '#232323', padding: '6px 0' }}>{value}</div>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ maxWidth: 1200, margin: '40px auto 0 auto', padding: '0 24px' }}>
        {/* Hero Section */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(31,38,135,0.08)', padding: 32, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 24 }}>
            <img src={venue.photo} alt={venue.name} style={{ width: 120, height: 120, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 700, color: '#232323', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
                {venue.name}
                <button
                  onClick={() => window.open('/venues/public', '_blank')}
                  style={{ background: '#fff', color: '#6a82fb', border: '1.5px solid #6a82fb', borderRadius: 8, padding: '6px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginLeft: 8 }}
                  title="View public page"
                >
                  Public Page
                </button>
              </h1>
              <p style={{ fontSize: 18, color: '#666', marginBottom: 8 }}>{venue.type}</p>
              <p style={{ fontSize: 16, color: '#888' }}>{venue.address}</p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
              {!editing && (
                <button onClick={() => setEditing(true)} style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Edit Venue</button>
              )}
              {editing && (
                <>
                  <button onClick={handleSave} style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Save Changes</button>
                  <button onClick={handleCancel} style={{ background: '#ececec', color: '#232323', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
                </>
              )}
            </div>
          </div>
          {/* Sub Navigation */}
          <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #ececec', marginBottom: 16 }}>
            {subNav.map(tab => (
              <button
                key={tab.path}
                onClick={() => setActiveSubNav(tab.path)}
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: activeSubNav === tab.path ? '#fff' : '#6a82fb',
                  background: activeSubNav === tab.path ? '#6a82fb' : 'transparent',
                  border: activeSubNav === tab.path ? 'none' : '1.5px solid #6a82fb',
                  borderBottom: activeSubNav === tab.path ? '3px solid #6a82fb' : '3px solid transparent',
                  borderRadius: 8,
                  padding: '10px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                aria-selected={activeSubNav === tab.path}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(31,38,135,0.08)', padding: 32, border: editing ? '2px solid #6a82fb' : undefined }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#232323', marginBottom: 24 }}>{subNav.find(tab => tab.path === activeSubNav)?.label}</h2>
          {/* Dynamic Sub Navigation Content */}
          {activeSubNav === 'details' && (
            <>
              {/* Tab Navigation */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: '1px solid #ececec', paddingBottom: 16 }}>
                {tabs.concat({ id: 'specs', label: 'Specs', icon: '🛠️' }).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 20px',
                      borderRadius: 8,
                      border: 'none',
                      background: activeTab === tab.id ? '#6a82fb' : 'transparent',
                      color: activeTab === tab.id ? '#fff' : '#666',
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`tab-panel-${tab.id}`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              {activeTab === 'basic' && (
                <div style={{ display: 'grid', gap: 10 }}>
                  {renderField('Venue Name', venue.name, 'name')}
                  {renderField('Venue Type', venue.type, 'type')}
                  {renderField('Address', venue.address, 'address')}
                  {renderField('Description', venue.description, 'description', 'textarea')}
                  {renderField('Operating Hours', venue.operatingHours, 'operatingHours')}
                  {renderField('Time Zone', venue.timeZone, 'timeZone')}
                  {renderField('Check-in Time', venue.checkIn, 'checkIn')}
                  {renderField('Check-out Time', venue.checkOut, 'checkOut')}
                </div>
              )}
              {activeTab === 'technical' && (
                <div style={{ display: 'grid', gap: 10 }}>
                  {renderField('Power Supply', venue.powerSupply, 'powerSupply')}
                  {renderField('Outlets', venue.outlets, 'outlets')}
                  {renderField('Generator Backup', venue.generator, 'generator')}
                  {renderField('Internet/WiFi', venue.internet, 'internet')}
                  {renderField('Lighting', venue.lighting, 'lighting')}
                  {renderField('Audio/Visual', venue.av, 'av')}
                  {renderField('Climate Control', venue.hvac, 'hvac')}
                  {renderField('Amenities', venue.amenities.join(', '), 'amenities')}
                  {renderField('Accessibility Features', venue.accessibility, 'accessibility')}
                </div>
              )}
              {activeTab === 'capacity' && (
                <div style={{ display: 'grid', gap: 10 }}>
                  {renderCapacityField('Max Capacity (Standing)', venue.maxCapacity, 'maxCapacity')}
                  {renderCapacityField('Seated Capacity', venue.seatedCapacity, 'seatedCapacity')}
                  {renderCapacityField('Banquet Capacity', venue.banquetCapacity, 'banquetCapacity')}
                  {renderCapacityField('Parking Capacity', venue.parkingCapacity, 'parkingCapacity')}
                  {renderDimensionField('Length (m)', venue.dimensions.length, 'length')}
                  {renderDimensionField('Width (m)', venue.dimensions.width, 'width')}
                  {renderDimensionField('Height (m)', venue.dimensions.height, 'height')}
                  {renderDimensionField('Total Area (m²)', venue.dimensions.totalArea, 'totalArea')}
                </div>
              )}
              {activeTab === 'policies' && (
                <div style={{ display: 'grid', gap: 10 }}>
                  {renderPoliciesField('Booking Policy', venue.bookingPolicy, 'bookingPolicy')}
                  {renderPoliciesField('House Rules', venue.houseRules, 'houseRules')}
                  {renderPoliciesField('Insurance/Legal Requirements', venue.insurance, 'insurance')}
                </div>
              )}
              {activeTab === 'contact' && (
                <div style={{ display: 'grid', gap: 10 }}>
                  {renderContactField('Contact Phone', venue.contactPhone, 'contactPhone', 'tel')}
                  {renderContactField('Contact Email', venue.contactEmail, 'contactEmail', 'email')}
                  {renderContactField('Venue Manager', venue.manager, 'manager')}
                  {renderContactField('Support Contact', venue.supportContact, 'supportContact', 'tel')}
                </div>
              )}
              {activeTab === 'specs' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="Power">⚡</span> <span><b>Power Supply:</b> {venue.powerSupply}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="Outlets">🔌</span> <span><b>Outlets:</b> {venue.outlets}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="Generator">🔋</span> <span><b>Generator:</b> {venue.generator}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="Internet">🌐</span> <span><b>Internet:</b> {venue.internet}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="Lighting">💡</span> <span><b>Lighting:</b> {venue.lighting}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="AV">🎤</span> <span><b>AV:</b> {venue.av}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="HVAC">❄️</span> <span><b>HVAC:</b> {venue.hvac}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="Amenities">🛎️</span> <span><b>Amenities:</b> {venue.amenities.join(', ')}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#232323' }}><span role="img" aria-label="Accessibility">♿</span> <span><b>Accessibility:</b> {venue.accessibility}</span></div>
                </div>
              )}
            </>
          )}
          {activeSubNav === 'spaces' && (
            <div id="tab-panel-spaces" role="tabpanel" aria-labelledby="spaces-tab">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#232323', margin: 0 }}>Spaces</h3>
                <button onClick={handleAddSpace} style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                  + Add Space
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                {spaces.map(space => (
                  <div key={space.id} style={{ background: '#f8f9fa', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb11', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1.5px solid #ececec' }}>
                    <img src={space.image} alt={space.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
                      <button
                        onClick={() => { if (typeof space.id === 'number') handleMenuToggle(space.id); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4, fontSize: 20, color: '#888' }}
                        title="More options"
                      >
                        ⋮
                      </button>
                      {menuOpenId === space.id && (
                        <div
                          ref={el => {
                            if (typeof space.id === 'number') {
                              menuRefs.current[space.id] = el;
                            }
                          }}
                          style={{ position: 'absolute', top: 28, right: 0, background: '#fff', border: '1px solid #ececec', borderRadius: 8, boxShadow: '0 2px 8px #0001', zIndex: 10, minWidth: 120 }}
                        >
                          <button
                            onClick={() => { if (typeof space.id === 'number') handleDeleteSpace(space.id); }}
                            style={{ width: '100%', background: 'none', border: 'none', color: '#e53935', padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: 15, cursor: 'pointer', borderRadius: 8 }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 17, color: '#232323', marginBottom: 2 }}>{space.name}</div>
                        <div style={{ fontSize: 15, color: '#6a82fb', fontWeight: 600, marginBottom: 2 }}>{space.type}</div>
                        <div style={{ fontSize: 14, color: '#888', marginBottom: 2 }}>Capacity: {space.capacity}</div>
                        <div style={{ fontSize: 14, color: space.status === 'Available' ? '#34a853' : space.status === 'Booked' ? '#f4b400' : '#e53935', fontWeight: 600, marginBottom: 6 }}>{space.status}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <button onClick={() => handleEditSpaceModal(space)} style={{ background: '#ececec', color: '#232323', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Edit Space Modal */}
              {editSpaceId !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 4px 24px #0002', display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#232323' }}>Edit Space</h3>
                    <input name="name" value={editSpaceData.name} onChange={handleEditSpaceChange} placeholder="Name" style={{ padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 15, color: '#232323', background: '#fff' }} />
                    <input name="type" value={editSpaceData.type} onChange={handleEditSpaceChange} placeholder="Type" style={{ padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 15, color: '#232323', background: '#fff' }} />
                    <input name="capacity" value={editSpaceData.capacity} onChange={handleEditSpaceChange} placeholder="Capacity" type="number" style={{ padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 15, color: '#232323', background: '#fff' }} />
                    <input name="status" value={editSpaceData.status} onChange={handleEditSpaceChange} placeholder="Status" style={{ padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 15, color: '#232323', background: '#fff' }} />
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                      <button onClick={handleEditSpaceCancel} style={{ background: '#232323', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
                      <button onClick={handleEditSpaceSave} style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Save</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeSubNav === 'analytics' && (
            <div style={{ minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 18, background: '#f8f9fa', borderRadius: 12, border: '1.5px solid #ececec', marginTop: 24 }}>
              <span style={{ fontSize: 40, marginBottom: 12 }}>📊</span>
              <div>Analytics & Reports coming soon.</div>
            </div>
          )}
        </div>
      </div>
      {modalData && (
        <SpaceModal open={modalOpen} onClose={() => { setModalOpen(false); setModalData(null); }} onSave={handleSaveSpace} initialData={modalData} />
      )}
    </div>
  );
} 