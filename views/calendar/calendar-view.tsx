"use client";

import React, { useState, useMemo } from 'react';
import { useMockDb } from '@/lib/mock-db-context';
import { Icons } from '@/components/icons';
import { CalendarEvent } from '@/types';
import { RecordDrawer } from '@/components/record-drawer';
import { ColumnDef } from '@/components/data-table';

// Basic date helpers
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export const CALENDAR_EVENT_COLUMNS: ColumnDef<CalendarEvent>[] = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Date', accessorKey: 'date' },
    { 
        header: 'Type', 
        accessorKey: 'type',
        options: ['Production', 'Delivery', 'Meeting', 'Milestone', 'Maintenance'],
        type: 'select'
    },
];

export const CalendarView = () => {
    const { state, updateRecord, addRecord } = useMockDb();
    const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 8)); // Starting at June 8, 2026 as per user context
    const [selectedDate, setSelectedDate] = useState<number | null>(8);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Aggregate all dates from the global state into a single list of events
    const allEvents = useMemo(() => {
        const events: { id: string; date: string; title: string; type: string; color: string; isEditable: boolean; raw?: CalendarEvent }[] = [];

        state.manufacturingOrders.forEach(mo => {
            if (mo.dueDate) events.push({ id: `mo-${mo.id}`, date: mo.dueDate, title: `MO Due: ${mo.orderNumber}`, type: 'Manufacturing', color: 'bg-orange-500', isEditable: false });
        });
        state.purchaseOrders.forEach(po => {
            if (po.deliveryDate) events.push({ id: `po-${po.id}`, date: po.deliveryDate, title: `PO Delivery: ${po.poNumber}`, type: 'Procurement', color: 'bg-blue-500', isEditable: false });
        });
        state.projectMilestones.forEach(pm => {
            if (pm.date) events.push({ id: `pm-${pm.id}`, date: pm.date, title: `Milestone: ${pm.title}`, type: 'Projects', color: 'bg-purple-500', isEditable: false });
        });
        state.activities.forEach(act => {
            if (act.date) events.push({ id: `act-${act.id}`, date: act.date, title: `CRM: ${act.title}`, type: 'CRM', color: 'bg-green-500', isEditable: false });
        });
        state.projectTasks.forEach(pt => {
            if (pt.dueDate) events.push({ id: `pt-${pt.id}`, date: pt.dueDate, title: `Task Due: ${pt.taskName}`, type: 'Projects', color: 'bg-purple-400', isEditable: false });
        });
        state.calendarEvents.forEach(ce => {
            if (ce.date) events.push({ id: ce.id, date: ce.date, title: ce.title, type: ce.type, color: 'bg-indigo-500', isEditable: true, raw: ce });
        });

        return events;
    }, [state]);

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDate(null);
    };

    const handlePrevYear = () => {
        setCurrentDate(new Date(year - 1, month, 1));
        setSelectedDate(null);
    };

    const handleNextYear = () => {
        setCurrentDate(new Date(year + 1, month, 1));
        setSelectedDate(null);
    };

    // Find events for the selected day
    const selectedDateString = selectedDate ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}` : '';
    const selectedEvents = allEvents.filter(e => e.date === selectedDateString);

    const handleSaveEvent = (updatedEvent: CalendarEvent) => {
        if (state.calendarEvents.some(e => e.id === updatedEvent.id)) {
            updateRecord('calendarEvents', updatedEvent.id, updatedEvent);
        } else {
            addRecord('calendarEvents', updatedEvent);
        }
    };

    const handleCreateEvent = () => {
        setSelectedEvent({
            id: `calevt-new-${Date.now()}`,
            title: 'New Meeting',
            date: selectedDateString || `${year}-${String(month + 1).padStart(2, '0')}-01`,
            type: 'Meeting',
        });
    };

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/50">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                
                {/* Calendar Grid */}
                <div className="flex-1 bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold text-gray-800 w-48">{monthName} {year}</h2>
                            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-sm p-0.5">
                                <button onClick={handlePrevYear} className="flex items-center p-1 hover:bg-gray-100 rounded-sm text-gray-500 transition-colors" title="Previous Year">
                                    <Icons.ChevronLeft className="w-4 h-4 opacity-50" />
                                    <Icons.ChevronLeft className="w-4 h-4 -ml-2" />
                                </button>
                                <button onClick={handlePrevMonth} className="flex items-center p-1 hover:bg-gray-100 rounded-sm text-gray-600 transition-colors" title="Previous Month">
                                    <Icons.ChevronLeft className="w-4 h-4" />
                                </button>
                                <button onClick={() => setCurrentDate(new Date(2026, 5, 8))} className="px-3 py-1 text-xs font-medium hover:bg-gray-100 rounded-sm text-gray-700 transition-colors border-x border-gray-100">
                                    Today
                                </button>
                                <button onClick={handleNextMonth} className="flex items-center p-1 hover:bg-gray-100 rounded-sm text-gray-600 transition-colors" title="Next Month">
                                    <Icons.ChevronRight className="w-4 h-4" />
                                </button>
                                <button onClick={handleNextYear} className="flex items-center p-1 hover:bg-gray-100 rounded-sm text-gray-500 transition-colors" title="Next Year">
                                    <Icons.ChevronRight className="w-4 h-4" />
                                    <Icons.ChevronRight className="w-4 h-4 -ml-2 opacity-50" />
                                </button>
                            </div>
                        </div>
                        <button 
                            onClick={handleCreateEvent}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm text-sm font-medium flex items-center gap-1.5"
                        >
                            <Icons.Plus className="w-4 h-4" />
                            Add Event
                        </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="p-2 text-center text-xs font-semibold text-gray-500">{d}</div>
                        ))}
                    </div>

                    {/* Calendar Cells */}
                    <div className="grid grid-cols-7 flex-1 min-h-[500px]">
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="border-b border-r border-gray-100 bg-gray-50/30 p-2 min-h-[100px]"></div>
                        ))}
                        
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const dayEvents = allEvents.filter(e => e.date === dateString);
                            const isSelected = selectedDate === day;
                            const isToday = year === 2026 && month === 5 && day === 8;

                            return (
                                <div 
                                    key={day} 
                                    onClick={() => setSelectedDate(day)}
                                    className={`border-b border-r border-gray-100 p-2 min-h-[100px] cursor-pointer transition-colors relative
                                        ${isSelected ? 'bg-blue-50/50 ring-inset ring-1 ring-blue-500' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>
                                            {day}
                                        </span>
                                        {dayEvents.length > 0 && (
                                            <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 rounded-sm">{dayEvents.length}</span>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-1 mt-2 overflow-y-auto max-h-[80px] no-scrollbar">
                                        {dayEvents.slice(0, 3).map((e, idx) => (
                                            <div key={idx} className="flex items-center gap-1.5 text-xs truncate" title={e.title}>
                                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${e.color}`}></span>
                                                <span className="text-gray-600 truncate">{e.title}</span>
                                            </div>
                                        ))}
                                        {dayEvents.length > 3 && (
                                            <div className="text-[10px] text-gray-400 pl-3">+{dayEvents.length - 3} more</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="w-full lg:w-80 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col h-full lg:max-h-[600px]">
                    <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-800">
                            {selectedDate ? `${monthName} ${selectedDate}, ${year}` : 'Select a date'}
                        </h3>
                        <p className="text-sm text-gray-500">{selectedEvents.length} events scheduled</p>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto space-y-4">
                        {!selectedDate && (
                            <p className="text-sm text-gray-400 text-center mt-10">Click on a calendar day to see events.</p>
                        )}
                        {selectedDate && selectedEvents.length === 0 && (
                            <p className="text-sm text-gray-400 text-center mt-10">No events for this date.</p>
                        )}
                        {selectedEvents.map((e, idx) => (
                            <div 
                                key={idx} 
                                className={`flex gap-3 p-2 rounded-sm ${e.isEditable ? 'cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-200' : ''}`}
                                onClick={() => {
                                    if (e.isEditable && e.raw) {
                                        setSelectedEvent(e.raw);
                                    }
                                }}
                            >
                                <div className={`w-1 h-full rounded-full flex-shrink-0 ${e.color}`}></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{e.type}</p>
                                        {e.isEditable && <Icons.MoreHorizontal className="w-3 h-3 text-gray-400" />}
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 leading-snug mt-0.5">{e.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <RecordDrawer<CalendarEvent>
                record={selectedEvent}
                columns={CALENDAR_EVENT_COLUMNS}
                onClose={() => setSelectedEvent(null)}
                onSave={handleSaveEvent}
                titleAccessor="title"
                subtitleAccessor="type"
            />
        </div>
    );
};
