import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Patient } from "@/domain/patient";
import { useVisiblePatients } from "@/presentation/hooks";

describe("useVisiblePatients", () => {
    const mockPatients: Patient[] = [
        {
            id: "1",
            name: "John Doe",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        },
        {
            id: "2",
            name: "Jane Smith",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        },
        {
            id: "3",
            name: "Bob Johnson",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        },
        {
            id: "4",
            name: "Alice Brown",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        },
        {
            id: "5",
            name: "Charlie Davis",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        },
        {
            id: "6",
            name: "David Wilson",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        },
        {
            id: "7",
            name: "Eve Green",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        },
    ];

    it("1- Should initially show limited patients", () => {
        const { result } = renderHook(() => useVisiblePatients(mockPatients));

        expect(result.current.visiblePatients.length).toBeLessThanOrEqual(
            mockPatients.length
        );
        expect(result.current.hasMorePatients).toBe(true);
    });

    it("2- Should load more patients when requested", () => {
        const { result } = renderHook(() => useVisiblePatients(mockPatients));

        act(() => {
            result.current.loadMore();
        });

        expect(result.current.visiblePatients.length).toBe(mockPatients.length);
        expect(result.current.hasMorePatients).toBe(false);
    });
});
