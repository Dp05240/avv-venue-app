export interface EquipmentAssignment {
  id: string;
  bookingId: string;
  bookingTitle: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  space: string;
  clientName: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  assignedBy: string;
  assignedAt: string;
  notes?: string;
  equipment: AssignedEquipment[];
  setupRequirements: SetupRequirement[];
}

export interface AssignedEquipment {
  id: string;
  inventoryItemId: number;
  itemName: string;
  itemSku: string;
  category: string;
  quantity: number;
  quantityNeeded: number;
  location: string;
  setupTime: string; // When equipment needs to be set up
  teardownTime: string; // When equipment can be removed
  status: 'assigned' | 'setup_complete' | 'in_use' | 'teardown_complete' | 'returned';
  assignedBy: string;
  assignedAt: string;
  notes?: string;
  setupInstructions?: string;
  specialRequirements?: string;
}

export interface SetupRequirement {
  id: string;
  requirement: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed';
  estimatedTime: number; // in minutes
  actualTime?: number;
  notes?: string;
}

export interface EquipmentConflict {
  id: string;
  equipmentId: number;
  equipmentName: string;
  conflictingAssignments: string[];
  conflictType: 'time_overlap' | 'insufficient_quantity' | 'maintenance_scheduled';
  severity: 'low' | 'medium' | 'high' | 'critical';
  suggestedResolution?: string;
}

export interface SetupList {
  id: string;
  assignmentId: string;
  eventTitle: string;
  eventDate: string;
  space: string;
  crewMembers: CrewMember[];
  equipment: AssignedEquipment[];
  setupRequirements: SetupRequirement[];
  timeline: SetupTimeline[];
  status: 'draft' | 'published' | 'in_progress' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  contact: string;
  assignedTasks: string[];
  startTime: string;
  endTime: string;
  status: 'assigned' | 'confirmed' | 'on_site' | 'completed';
}

export interface SetupTimeline {
  id: string;
  time: string;
  task: string;
  assignedTo: string[];
  equipment?: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed';
  notes?: string;
}

export interface EquipmentCalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  assignmentId: string;
  equipmentId: number;
  equipmentName: string;
  space: string;
  status: 'assigned' | 'setup' | 'in_use' | 'teardown';
  color: string;
}

export interface EquipmentUsageReport {
  period: string;
  totalAssignments: number;
  totalEquipmentUsed: number;
  mostUsedEquipment: {
    itemName: string;
    usageCount: number;
    totalHours: number;
  }[];
  spaceUtilization: {
    space: string;
    assignments: number;
    utilizationRate: number;
  }[];
  crewEfficiency: {
    crewMember: string;
    tasksCompleted: number;
    averageTime: number;
  }[];
} 