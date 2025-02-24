import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PatientForm } from "@/presentation/components/patient/PatientForm";
import { usePatientContext } from "@/presentation/context";
import { Patient } from "@/domain/patient";

// 🔥 Mockeamos `usePatientContext`
vi.mock("@/presentation/context", () => ({
    usePatientContext: vi.fn(),
}));

describe("PatientForm", () => {
    const mockOnSubmit = vi.fn();
    const mockOnCancel = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("1- Render", () => {
        it("1- Should render the create form when no patient is provided", () => {
            // Simulamos que `usePatientContext` devuelve `null`
            (usePatientContext as unknown as Mock).mockReturnValue({
                patient: null,
            });

            render(
                <PatientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
            );

            expect(screen.getByText("Create Patient")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Joe Doe")).toBeInTheDocument();
        });

        it("2- Should render the edit form when a patient is provided", () => {
            const mockPatient: Patient = {
                id: "1",
                name: "John Doe",
                avatar: "https://example.com/avatar.png",
                description: "Test description",
                website: "https://example.com",
                createdAt: "2024-03-20",
            };

            // Simulamos que `usePatientContext` devuelve un paciente
            (usePatientContext as unknown as Mock).mockReturnValue({
                patient: mockPatient,
            });

            render(
                <PatientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
            );

            expect(screen.getByText("Edit Patient")).toBeInTheDocument();
            expect(
                screen.getByDisplayValue(mockPatient.name)
            ).toBeInTheDocument();
            expect(
                screen.getByDisplayValue(mockPatient.avatar)
            ).toBeInTheDocument();
            expect(
                screen.getByDisplayValue(mockPatient.description)
            ).toBeInTheDocument();
            expect(
                screen.getByDisplayValue(mockPatient.website)
            ).toBeInTheDocument();
        });
    });

    describe("2- Validations", () => {
        it("1- Should show errors when submitting an empty form", async () => {
            (usePatientContext as unknown as Mock).mockReturnValue({
                patient: null,
            });

            render(
                <PatientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
            );
            fireEvent.click(screen.getByTestId("save-button"));

            await waitFor(() => {
                expect(
                    screen.getByText(/Name is required/i)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/Description is required/i)
                ).toBeInTheDocument();
                expect(
                    screen.getByText(/URL is required/i)
                ).toBeInTheDocument();
            });

            expect(mockOnSubmit).not.toHaveBeenCalled();
        });

        it("2- Should show an error if the name has less than 3 characters", async () => {
            (usePatientContext as unknown as Mock).mockReturnValue({
                patient: null,
            });

            render(
                <PatientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
            );
            fireEvent.change(screen.getByTestId("input-Name"), {
                target: { value: "Jo" },
            });
            fireEvent.click(screen.getByTestId("save-button"));

            await waitFor(() => {
                expect(
                    screen.getByText(/Name must be at least 3 characters/i)
                ).toBeInTheDocument();
            });
        });

        it("3- Should show an error if the URL is invalid", async () => {
            (usePatientContext as unknown as Mock).mockReturnValue({
                patient: null,
            });

            render(
                <PatientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
            );
            fireEvent.change(screen.getByTestId("input-Website"), {
                target: { value: "invalid-url" },
            });
            fireEvent.click(screen.getByTestId("save-button"));

            await waitFor(() => {
                expect(
                    screen.getByText(/Invalid URL format/i)
                ).toBeInTheDocument();
            });
        });
    });

    describe("3- Events", () => {
        it("1- Should call `onSubmit` with the correct data when the form is valid", async () => {
            (usePatientContext as unknown as Mock).mockReturnValue({
                patient: null,
            });

            render(
                <PatientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
            );

            fireEvent.change(screen.getByTestId("input-Name"), {
                target: { value: "John Doe" },
            });
            
            fireEvent.change(screen.getByTestId("input-Description"), {
                target: { value: "Test description" },
            });
            
            fireEvent.change(screen.getByTestId("input-Website"), {
                target: { value: "https://example.com" },
            });

            
            fireEvent.click(screen.getByTestId("save-button"));

            await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalled();
                const submittedData = mockOnSubmit.mock.calls[0][0];
                
                expect(submittedData.name).toBe("John Doe");
                expect(submittedData.description).toBe("Test description");
                expect(submittedData.website).toBe("https://example.com");
            });
        });

        it("2- Should call `onCancel` when the cancel button is clicked", () => {
            (usePatientContext as unknown as Mock).mockReturnValue({
                patient: null,
            });

            render(
                <PatientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
            );
            fireEvent.click(screen.getByTestId("cancel-button"));

            expect(mockOnCancel).toHaveBeenCalled();
        });
    });
});
