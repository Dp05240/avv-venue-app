# Booking Management System

This module provides comprehensive booking management functionality for the venue management application.

## Features

### Core Booking Management
- **Create Bookings**: Add new venue bookings with detailed information
- **Edit Bookings**: Modify existing booking details
- **View Bookings**: Calendar and list views with filtering and search
- **Delete Bookings**: Remove bookings from the system

### Enhanced Booking Operations

#### 1. Booking Cancellation
- **Smart Cancellation Policy**: Automatic fee calculation based on days until event
- **Refund Management**: Full, partial, or no refund options
- **Reason Tracking**: Document cancellation reasons for reporting
- **Client Notification**: Optional email notifications

**Cancellation Fee Schedule:**
- More than 30 days: No fee
- 15-30 days: 10% fee
- 8-14 days: 25% fee
- 4-7 days: 50% fee
- Less than 4 days: 100% fee

#### 2. Date Change Management
- **Availability Checking**: Real-time conflict detection
- **Flexible Scheduling**: Change date, start time, and end time
- **Reason Documentation**: Track why changes were made
- **Client Notification**: Automatic email notifications
- **Conflict Resolution**: View conflicting bookings and alternative times

#### 3. Space Change Management
- **Space Availability**: Check availability across all venues
- **Capacity Validation**: Ensure new space can accommodate attendees
- **Feature Comparison**: View space features and amenities
- **Alternative Suggestions**: Get recommendations for available spaces
- **Client Notification**: Inform clients of space changes

## Components

### Main Components
- `page.tsx` - Main booking management page
- `BookingSidebar.tsx` - Sidebar with booking lists and quick actions
- `BookingsCalendar.tsx` - Calendar view for bookings
- `BookingModal.tsx` - Create/edit booking form
- `BookingDetails.tsx` - Detailed booking information view

### Modal Components
- `CancellationModal.tsx` - Handle booking cancellations with refund options
- `DateChangeModal.tsx` - Change booking dates with availability checking
- `SpaceChangeModal.tsx` - Change booking spaces with capacity validation
- `CalendarBlockModal.tsx` - Block calendar dates for maintenance/closure

## API Integration

### Booking Operations
```typescript
// Cancel booking
await bookingsApi.cancel(bookingId, {
  reason: string,
  refundAmount: number,
  refundMethod: 'full' | 'partial' | 'none',
  notes: string,
  cancellationFee: number
});

// Change booking date
await bookingsApi.changeDate(bookingId, {
  newDate: string,
  newStartTime: string,
  newEndTime: string,
  reason: string,
  notes: string,
  notifyClient: boolean
});

// Change booking space
await bookingsApi.changeSpace(bookingId, {
  newSpace: string,
  reason: string,
  notes: string,
  notifyClient: boolean,
  checkAvailability: boolean
});

// Check availability
await bookingsApi.checkAvailability({
  date: string,
  startTime: string,
  endTime: string,
  space?: string,
  excludeBookingId?: string
});
```

## Usage

### Cancelling a Booking
1. Select a booking from the list or calendar
2. Click "Cancel" button or use the "Manage" dropdown
3. Fill in cancellation reason and refund options
4. Review cancellation fee calculation
5. Confirm cancellation

### Changing Booking Date
1. Select a booking from the list or calendar
2. Click "Change Date" button or use the "Manage" dropdown
3. Select new date and time
4. Check availability for conflicts
5. Provide reason for change
6. Choose whether to notify client
7. Confirm date change

### Changing Booking Space
1. Select a booking from the list or calendar
2. Click "Change Space" button or use the "Manage" dropdown
3. Select new space from available options
4. Review capacity and features
5. Check availability for conflicts
6. Provide reason for change
7. Choose whether to notify client
8. Confirm space change

## Data Flow

1. **User Action** → Component triggers modal
2. **Modal Form** → User fills in required information
3. **Validation** → Check availability, capacity, etc.
4. **API Call** → Send request to backend
5. **State Update** → Update local booking data
6. **UI Refresh** → Reflect changes in calendar/list views
7. **Notification** → Optional client email notification

## Error Handling

- **Network Errors**: Graceful fallback with user-friendly messages
- **Validation Errors**: Real-time form validation with helpful feedback
- **Availability Conflicts**: Clear display of conflicting bookings
- **Capacity Warnings**: Alert when new space capacity is insufficient

## Future Enhancements

- **Bulk Operations**: Cancel/change multiple bookings at once
- **Advanced Notifications**: SMS, push notifications, and custom templates
- **Approval Workflows**: Multi-step approval for significant changes
- **Audit Trail**: Complete history of all booking modifications
- **Integration**: Connect with external calendar systems
- **Reporting**: Detailed analytics on cancellations and changes 