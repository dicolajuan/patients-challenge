import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PatientCard } from '@/presentation/components/patient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('PatientCard', () => {
    const mockPatient = {
        id: '1',
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
        description: 'Lorem ipsum dolor sit amet',
        website: 'https://example.com',
        createdAt: new Date().toISOString(),
    };

    it('1- Renders patient information correctly', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <PatientCard 
                    patient={mockPatient}
                    isExpanded={false}
                    onToggle={() => {}}
                />
            </QueryClientProvider>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('https://example.com')).toBeInTheDocument();
    });

    it('2- Calls onToggle when clicked', () => {
        const mockToggle = vi.fn();
        render(
            <QueryClientProvider client={queryClient}>
                <PatientCard 
                    patient={mockPatient}
                    isExpanded={false}
                    onToggle={mockToggle}
                />
            </QueryClientProvider>
        );

        fireEvent.click(screen.getByTestId('patient-card-1'));
        expect(mockToggle).toHaveBeenCalledOnce();
    });
}); 