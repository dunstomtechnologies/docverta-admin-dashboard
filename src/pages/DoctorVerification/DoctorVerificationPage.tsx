import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  FileText,
} from 'lucide-react';
import { MOCK_PENDING_REQUESTS } from '../../data/mock/pendingRequests.mock';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { getRolePermissions } from '../../utils/security';
import { formatRelativeTime } from '../../utils/formatters';

export const DoctorVerificationPage: React.FC = () => {
  const { user } = useAuthStore();
  const permissions = getRolePermissions(user?.role || 'admin');

  const [requests, setRequests] = useState(MOCK_PENDING_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<(typeof MOCK_PENDING_REQUESTS)[0] | null>(
    null
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setSelectedRequest(null);
    setFeedbackMessage(
      `Doctor application ${action === 'approve' ? 'approved' : 'rejected'} successfully.`
    );
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast feedback */}
      {feedbackMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          {feedbackMessage}
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Doctor Verification & Credentialing</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            National Medical Commission (NMC) registration verification & degree credential checks
          </p>
        </div>
        {!permissions.canVerifyDoctors && (
          <span className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-800 font-medium">
            Read-only mode (Auditor role cannot approve/reject)
          </span>
        )}
      </div>

      {/* Request Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests.map((req) => (
          <div
            key={req.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {req.id}
                </span>
                <Badge
                  variant={req.priority === 'high' ? 'danger' : 'warning'}
                  size="sm"
                >
                  {req.priority.toUpperCase()} PRIORITY
                </Badge>
              </div>

              <div className="mt-4">
                <h4 className="text-base font-bold text-slate-900">{req.doctorName}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{req.specialization}</p>
              </div>

              <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">License ID</span>
                  <span className="font-mono font-bold text-slate-800">{req.licenseNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Documents Attached</span>
                  <span className="font-semibold text-slate-800">{req.documentsCount} files</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Submission Date</span>
                  <span className="text-slate-600">{formatRelativeTime(req.submittedAt)}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedRequest(req)}
              >
                Review Documents
              </Button>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-800">All pending applications reviewed</p>
            <p className="text-xs text-slate-400 mt-1">
              There are currently no doctor credentialing requests waiting for approval.
            </p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={`Credential Review • ${selectedRequest.doctorName}`}
          description="Verify state medical council registration certificates and educational credentials"
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Doctor</span>
                <p className="font-bold text-slate-900 text-sm">{selectedRequest.doctorName}</p>
                <p className="text-slate-500">{selectedRequest.specialization}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">NMC / State License Number</span>
                <p className="font-mono font-bold text-slate-900 text-sm">
                  {selectedRequest.licenseNumber}
                </p>
                <span className="text-emerald-600 font-semibold text-[10px]">Registry Active</span>
              </div>
            </div>

            {/* Simulated Verified Documents */}
            <div>
              <p className="font-bold text-slate-800 mb-2">Uploaded Verification Files</p>
              <div className="space-y-2">
                {[
                  { name: 'NMC_Registration_Certificate_2026.pdf', size: '2.4 MB' },
                  { name: 'SuperSpecialty_DM_Degree.pdf', size: '3.1 MB' },
                  { name: 'Hospital_Affiliation_Letter.pdf', size: '1.2 MB' },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-2.5 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-slate-700">{doc.name}</span>
                    </div>
                    <span className="text-slate-400">{doc.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRequest(null)}
              >
                Cancel
              </Button>

              {permissions.canVerifyDoctors && (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<XCircle className="h-4 w-4" />}
                    onClick={() => handleAction(selectedRequest.id, 'reject')}
                  >
                    Reject Application
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<CheckCircle className="h-4 w-4" />}
                    onClick={() => handleAction(selectedRequest.id, 'approve')}
                  >
                    Approve & Issue Practicing Rights
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
