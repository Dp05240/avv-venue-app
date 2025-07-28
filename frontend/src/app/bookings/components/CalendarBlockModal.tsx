'use client';

import { useState, useEffect } from 'react';
import type { Booking, CalendarBlock } from '../../../services/api';

interface CalendarBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blockData: Partial<CalendarBlock>) => void;
  selectedDate?: Date;
  existingBlocks?: CalendarBlock[];
  availableSpaces?: string[];
}

export default function CalendarBlockModal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  existingBlocks = [],
  availableSpaces = ['Main Hall', 'Garden Room', 'Rooftop', 'Conference Room A', 'Conference Room B']
}: CalendarBlockModalProps) {
  const [blockType, setBlockType] = useState<'venue_closure' | 'space_block' | 'advance_booking' | 'maintenance'>('venue_closure');
  const [startDate, setStartDate] = useState(selectedDate ? selectedDate.toISOString().split('T')[0] : '');
  const [endDate, setEndDate] = useState(selectedDate ? selectedDate.toISOString().split('T')[0] : '');
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPattern, setRecurringPattern] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [isDateRange, setIsDateRange] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setStartDate(dateStr);
      setEndDate(dateStr);
    }
  }, [selectedDate]);

  const handleSpaceToggle = (space: string) => {
    setSelectedSpaces(prev => 
      prev.includes(space) 
        ? prev.filter(s => s !== space)
        : [...prev, space]
    );
  };

  const handleSave = () => {
    if (!startDate || !reason.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const blockData: Partial<CalendarBlock> = {
      date: startDate,
      startDate: isDateRange ? startDate : undefined,
      endDate: isDateRange ? endDate : undefined,
      type: blockType,
      spaces: blockType === 'space_block' ? selectedSpaces : undefined,
      reason: reason.trim(),
      description: description.trim() || undefined,
      isRecurring,
      recurringPattern: isRecurring ? recurringPattern : undefined,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User', // This would come from auth context
    };

    onSave(blockData);
  };

  const getBlockTypeInfo = (type: string) => {
    switch (type) {
      case 'venue_closure':
        return {
          title: 'Venue Closure',
          description: 'Block the entire venue - no events accepted',
          icon: '🚫',
          color: '#e74c3c'
        };
      case 'space_block':
        return {
          title: 'Space Block',
          description: 'Block specific spaces while keeping others available',
          icon: '🔒',
          color: '#f39c12'
        };
      case 'advance_booking':
        return {
          title: 'Advance Booking Block',
          description: 'Reserve for potential major client events',
          icon: '⭐',
          color: '#9b59b6'
        };
      case 'maintenance':
        return {
          title: 'Maintenance Block',
          description: 'Block for scheduled maintenance or repairs',
          icon: '🔧',
          color: '#3498db'
        };
      default:
        return {
          title: 'Block Calendar',
          description: 'Block calendar days',
          icon: '📅',
          color: '#95a5a6'
        };
    }
  };

  const blockInfo = getBlockTypeInfo(blockType);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '32px',
        maxWidth: 600,
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', margin: 0 }}>
              {blockInfo.icon} {blockInfo.title}
            </h2>
            <p style={{ fontSize: 14, color: '#666', margin: '4px 0 0 0' }}>
              {blockInfo.description}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: '#999',
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        {/* Block Type Selection */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8 }}>
            Block Type
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {(['venue_closure', 'space_block', 'advance_booking', 'maintenance'] as const).map((type) => {
              const info = getBlockTypeInfo(type);
              return (
                <button
                  key={type}
                  onClick={() => setBlockType(type)}
                  style={{
                    padding: '16px',
                    border: `2px solid ${blockType === type ? info.color : '#e5e7eb'}`,
                    borderRadius: 8,
                    background: blockType === type ? `${info.color}10` : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{info.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{info.title}</div>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{info.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Selection */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
              <input
                type="checkbox"
                checked={isDateRange}
                onChange={(e) => setIsDateRange(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              Block Date Range
            </label>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: isDateRange ? '1fr 1fr' : '1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8 }}>
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 14,
                }}
              />
            </div>
            {isDateRange && (
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8 }}>
                  End Date *
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Space Selection (for space blocks) */}
        {blockType === 'space_block' && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8 }}>
              Select Spaces to Block *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
              {availableSpaces.map((space) => (
                <button
                  key={space}
                  onClick={() => handleSpaceToggle(space)}
                  style={{
                    padding: '12px',
                    border: `2px solid ${selectedSpaces.includes(space) ? '#6a82fb' : '#e5e7eb'}`,
                    borderRadius: 8,
                    background: selectedSpaces.includes(space) ? '#6a82fb' : '#fff',
                    color: selectedSpaces.includes(space) ? '#fff' : '#333',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                >
                  {space}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reason */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8 }}>
            Reason for Blocking *
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Venue closed for holidays, Maintenance scheduled, Reserved for major event"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 14,
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8 }}>
            Additional Details
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide additional details about this block..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 14,
              resize: 'vertical',
            }}
          />
        </div>

        {/* Recurring Options */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              Make this block recurring
            </label>
          </div>
          
          {isRecurring && (
            <div style={{ marginLeft: 24 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8 }}>
                Recurring Pattern
              </label>
              <select
                value={recurringPattern}
                onChange={(e) => setRecurringPattern(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 14,
                  background: '#fff',
                }}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}
        </div>

        {/* Existing Blocks Warning */}
        {existingBlocks.length > 0 && (
          <div style={{
            padding: '12px',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: 8,
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#856404', marginBottom: 4 }}>
              ⚠️ Existing Blocks Detected
            </div>
            <div style={{ fontSize: 12, color: '#856404' }}>
              There are {existingBlocks.length} existing block(s) for the selected date(s). 
              This new block will be added alongside existing ones.
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              background: '#fff',
              color: '#666',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: 8,
              background: blockInfo.color,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Create Block
          </button>
        </div>
      </div>
    </div>
  );
} 