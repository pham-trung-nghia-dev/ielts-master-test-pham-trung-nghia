import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateAssignmentStatus } from '../lib/assignment-utils';
import { getStudentAssignments } from '../lib/assignment-service';
import { SIMULATED_CURRENT_TIME, MOCK_ASSIGNMENTS } from '../data/mock-assignments';

describe('1. Logic Tính toán Trạng thái Bài tập (Assignment Status Logic)', () => {
  // Mốc tham chiếu giả lập: 11/11/2026, 09:00 (GMT+7)

  it('A01: Chưa nộp và còn hạn (Hạn: 13/11 23:59) -> Trạng thái "Chưa nộp"', () => {
    const status = calculateAssignmentStatus(
      '2026-11-13T23:59:00+07:00',
      null,
      SIMULATED_CURRENT_TIME
    );

    assert.equal(status.code, 'PENDING');
    assert.equal(status.label, 'Chưa nộp');
    assert.equal(status.isLate, false);
  });

  it('A02: Chưa nộp và hết hạn (Hạn: 09/11 23:59) -> Trạng thái "Quá hạn"', () => {
    const status = calculateAssignmentStatus(
      '2026-11-09T23:59:00+07:00',
      null,
      SIMULATED_CURRENT_TIME
    );

    assert.equal(status.code, 'OVERDUE');
    assert.equal(status.label, 'Quá hạn');
    assert.equal(status.isLate, false);
  });

  it('A03: Đã nộp đúng hạn (Hạn: 10/11 23:59, Nộp: 10/11 20:00) -> Trạng thái "Đã nộp"', () => {
    const status = calculateAssignmentStatus(
      '2026-11-10T23:59:00+07:00',
      '2026-11-10T20:00:00+07:00',
      SIMULATED_CURRENT_TIME
    );

    assert.equal(status.code, 'SUBMITTED');
    assert.equal(status.label, 'Đã nộp');
    assert.equal(status.isLate, false);
    assert.equal(status.lateLabel, undefined);
  });

  it('A04: Đã nộp sau hạn (Hạn: 08/11 23:59, Nộp: 10/11 12:00) -> Trạng thái "Đã nộp" + "Nộp trễ"', () => {
    const status = calculateAssignmentStatus(
      '2026-11-08T23:59:00+07:00',
      '2026-11-10T12:00:00+07:00',
      SIMULATED_CURRENT_TIME
    );

    assert.equal(status.code, 'SUBMITTED');
    assert.equal(status.label, 'Đã nộp');
    assert.equal(status.isLate, true);
    assert.equal(status.lateLabel, 'Nộp trễ');
  });

  it('Edge case: Nộp sát nút đúng hạn (submittedAt == dueDate) -> Trạng thái "Đã nộp", không trễ', () => {
    const status = calculateAssignmentStatus(
      '2026-11-10T23:59:00+07:00',
      '2026-11-10T23:59:00+07:00',
      SIMULATED_CURRENT_TIME
    );

    assert.equal(status.code, 'SUBMITTED');
    assert.equal(status.label, 'Đã nộp');
    assert.equal(status.isLate, false);
  });
});

describe('2. Kiểm soát Phân quyền & Cô lập Dữ liệu (Student Data Isolation)', () => {
  it('Chỉ lọc và trả về bài tập của S01 (A01 - A04), tuyệt đối không lẫn B01 của S02', async () => {
    const result = await getStudentAssignments('S01');

    // Kết quả phải có đúng 4 bài
    assert.equal(result.length, 4);

    // Mọi bản ghi đều phải có studentId là S01
    const allBelongToS01 = result.every((item) => item.studentId === 'S01');
    assert.equal(allBelongToS01, true);

    // Danh sách id phải khớp [A01, A02, A03, A04]
    const assignmentIds = result.map((item) => item.id);
    assert.deepEqual(assignmentIds, ['A01', 'A02', 'A03', 'A04']);

    // Tuyệt đối không chứa B01 của S02
    assert.equal(assignmentIds.includes('B01'), false);
  });

  it('Khi truy vấn học viên S02, chỉ trả về bài của S02 (B01)', async () => {
    const result = await getStudentAssignments('S02');

    assert.equal(result.length, 1);
    assert.equal(result[0].id, 'B01');
    assert.equal(result[0].studentId, 'S02');
  });

  it('Đối chiếu tổng số bản ghi trong Mock DB với kết quả phân quyền', () => {
    const s01Count = MOCK_ASSIGNMENTS.filter((a) => a.studentId === 'S01').length;
    const s02Count = MOCK_ASSIGNMENTS.filter((a) => a.studentId === 'S02').length;

    assert.equal(MOCK_ASSIGNMENTS.length, 5);
    assert.equal(s01Count, 4);
    assert.equal(s02Count, 1);
  });
});
