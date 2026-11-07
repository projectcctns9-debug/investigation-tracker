import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useMaster } from '../context/MasterContext';
import { UserAccount, UserRole } from '../types';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  KeyRound, 
  Search, 
  CheckCircle, 
  XCircle, 
  Building2, 
  MapPin,
  Clock,
  Shield,
  Check,
  X,
  Lock,
  Eye,
  EyeOff,
  UserCog,
  Pencil,
  AlertCircle
} from 'lucide-react';

export const UserManagement: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser, allUsers, toggleUserStatus, addUser, resetPassword, updateUser } = useAuth();
  const { districts, policeStations } = useMaster();

  const isDistrictAdmin = currentUser.role === 'DISTRICT_ADMIN';
  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';

  // Resolved district for District Admin (Strict Mapping)
  const adminDistrict = districts.find(d => 
    (currentUser.districtId && d.id === currentUser.districtId) ||
    (currentUser.districtCode && d.code.toLowerCase() === currentUser.districtCode.toLowerCase()) ||
    (currentUser.districtNameEn && d.nameEn.toLowerCase() === currentUser.districtNameEn.toLowerCase())
  ) || districts.find(d => d.code === 'DURG') || districts[0];

  const defaultDistrictId = isDistrictAdmin ? (adminDistrict?.id || 'dist-durg') : (districts[0]?.id || 'dist-durg');

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form state
  const [newUsername, setNewUsername] = useState('');
  const [newFullNameHi, setNewFullNameHi] = useState('');
  const [newPassword, setNewPassword] = useState('cgpolice@123');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newRole, setNewRole] = useState<UserRole>(isDistrictAdmin ? 'SHO' : 'SUPER_ADMIN');
  const [newDistrictId, setNewDistrictId] = useState<string>(defaultDistrictId);
  const [newPsId, setNewPsId] = useState<string>('');
  const [newBadge, setNewBadge] = useState('');
  const [newMobile, setNewMobile] = useState('');

  // Edit / Modify User Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<UserAccount | null>(null);
  const [editFullNameHi, setEditFullNameHi] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [editRole, setEditRole] = useState<UserRole>('SHO');
  const [editDistrictId, setEditDistrictId] = useState<string>(defaultDistrictId);
  const [editPsId, setEditPsId] = useState<string>('');
  const [editBadge, setEditBadge] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editIsActive, setEditIsActive] = useState<boolean>(true);
  const [editSuccessMsg, setEditSuccessMsg] = useState('');

  // Reset Password Modal State
  const [resetModalUser, setResetModalUser] = useState<UserAccount | null>(null);
  const [resetNewPass, setResetNewPass] = useState('');
  const [showResetPass, setShowResetPass] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  // Available police stations based on selected district
  const availablePsList = policeStations.filter(p => p.districtId === (isDistrictAdmin ? adminDistrict?.id : newDistrictId));
  const editAvailablePsList = policeStations.filter(p => p.districtId === (isDistrictAdmin ? adminDistrict?.id : editDistrictId));

  // Initialize newPsId when availablePsList changes
  useEffect(() => {
    if (availablePsList.length > 0 && !availablePsList.some(p => p.id === newPsId)) {
      setNewPsId(availablePsList[0].id);
    }
  }, [newDistrictId, availablePsList]);

  // Keep editPsId consistent when editDistrictId changes
  useEffect(() => {
    if (editAvailablePsList.length > 0 && !editAvailablePsList.some(p => p.id === editPsId)) {
      setEditPsId(editAvailablePsList[0].id);
    }
  }, [editDistrictId, editAvailablePsList]);

  // Filter users list based on role and district isolation
  const filteredUsers = allUsers.filter(u => {
    // If District Admin, ONLY show users in their district
    if (isDistrictAdmin && u.districtId !== adminDistrict?.id) {
      return false;
    }
    return (
      searchTerm === '' ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.fullNameHi.includes(searchTerm) ||
      (u.badgeNumber && u.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.policeStationNameHi && u.policeStationNameHi.includes(searchTerm))
    );
  });

  const handleOpenAddModal = () => {
    setNewUsername('');
    setNewFullNameHi('');
    setNewPassword('cgpolice@123');
    setNewBadge('');
    setNewMobile('');
    if (isDistrictAdmin) {
      setNewRole('SHO');
      setNewDistrictId(adminDistrict?.id || 'dist-durg');
      const distPs = policeStations.filter(p => p.districtId === adminDistrict?.id);
      if (distPs.length > 0) setNewPsId(distPs[0].id);
    } else {
      setNewRole('SUPER_ADMIN');
      setNewDistrictId(districts[0]?.id || 'dist-durg');
    }
    setShowAddModal(true);
  };

  const handleOpenEditModal = (user?: UserAccount) => {
    const targetUser = user || filteredUsers[0] || allUsers[0];
    if (!targetUser) {
      alert('संशोधन हेतु कोई उपयोगकर्ता उपलब्ध नहीं है!');
      return;
    }
    setEditUser(targetUser);
    setEditFullNameHi(targetUser.fullNameHi || '');
    setEditUsername(targetUser.username || '');
    setEditPassword(targetUser.password || 'cgpolice@123');
    setShowEditPassword(false);
    setEditRole(targetUser.role);
    setEditDistrictId(targetUser.districtId || defaultDistrictId);
    setEditPsId(targetUser.policeStationId || '');
    setEditBadge(targetUser.badgeNumber || '');
    setEditMobile(targetUser.mobile || '');
    setEditIsActive(targetUser.isActive);
    setEditSuccessMsg('');
    setShowEditModal(true);
  };

  const handleSelectUserToEdit = (userId: string) => {
    const target = allUsers.find(u => u.id === userId);
    if (target) {
      setEditUser(target);
      setEditFullNameHi(target.fullNameHi || '');
      setEditUsername(target.username || '');
      setEditPassword(target.password || 'cgpolice@123');
      setEditRole(target.role);
      setEditDistrictId(target.districtId || defaultDistrictId);
      setEditPsId(target.policeStationId || '');
      setEditBadge(target.badgeNumber || '');
      setEditMobile(target.mobile || '');
      setEditIsActive(target.isActive);
    }
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    if (!editUsername.trim() || !editFullNameHi.trim()) {
      alert('कृपया यूजर आईडी एवं अधिकारी का नाम दर्ज करें!');
      return;
    }
    if (!editPassword.trim()) {
      alert('कृपया पासवर्ड दर्ज करें!');
      return;
    }

    const dist = districts.find(d => d.id === (isDistrictAdmin ? adminDistrict?.id : editDistrictId));
    const ps = policeStations.find(p => p.id === editPsId);

    const updatedData: Partial<UserAccount> = {
      username: editUsername.trim(),
      fullNameHi: editFullNameHi.trim(),
      fullNameEn: editFullNameHi.trim(),
      password: editPassword.trim(),
      role: editRole,
      roleLabelHi: editRole === 'SUPER_ADMIN' 
        ? 'मुख्यालय सुपर एडमिन' 
        : (editRole === 'DISTRICT_ADMIN' 
          ? `जिला एडमिन (${dist?.nameHi || 'जिला'})` 
          : `थाना प्रभारी (${ps?.nameHi || 'थाना'})`),
      districtId: editRole !== 'SUPER_ADMIN' ? dist?.id : undefined,
      districtNameEn: editRole !== 'SUPER_ADMIN' ? dist?.nameEn : undefined,
      districtNameHi: editRole !== 'SUPER_ADMIN' ? dist?.nameHi : undefined,
      districtCode: editRole !== 'SUPER_ADMIN' ? dist?.code : undefined,
      policeStationId: editRole === 'SHO' ? ps?.id : undefined,
      policeStationNameEn: editRole === 'SHO' ? ps?.nameEn : undefined,
      policeStationNameHi: editRole === 'SHO' ? ps?.nameHi : undefined,
      policeStationCode: editRole === 'SHO' ? ps?.code : undefined,
      badgeNumber: editBadge.trim(),
      mobile: editMobile.trim(),
      isActive: editIsActive
    };

    updateUser(editUser.id, updatedData);
    setEditSuccessMsg(`यूजर आईडी [${editUsername.trim()}] का विवरण (नाम, पद, पासवर्ड आदि) सफलतापूर्वक संशोधित किया गया!`);
    setTimeout(() => {
      setShowEditModal(false);
      setEditSuccessMsg('');
    }, 1200);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newFullNameHi.trim()) {
      alert('कृपया यूजरनेम एवं पूरा नाम दर्ज करें!');
      return;
    }

    if (!newPassword.trim()) {
      alert('कृपया उपयोगकर्ता का पासवर्ड दर्ज करें!');
      return;
    }

    const dist = districts.find(d => d.id === (isDistrictAdmin ? adminDistrict?.id : newDistrictId));
    const ps = policeStations.find(p => p.id === newPsId);

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      username: newUsername.trim(),
      password: newPassword.trim(),
      fullNameEn: newFullNameHi.trim(),
      fullNameHi: newFullNameHi.trim(),
      role: newRole,
      roleLabelHi: newRole === 'SUPER_ADMIN' 
        ? 'मुख्यालय सुपर एडमिन' 
        : (newRole === 'DISTRICT_ADMIN' 
          ? `जिला एडमिन (${dist?.nameHi || 'जिला'})` 
          : `थाना प्रभारी (${ps?.nameHi || 'थाना'})`),
      districtId: newRole !== 'SUPER_ADMIN' ? dist?.id : undefined,
      districtNameEn: newRole !== 'SUPER_ADMIN' ? dist?.nameEn : undefined,
      districtNameHi: newRole !== 'SUPER_ADMIN' ? dist?.nameHi : undefined,
      districtCode: newRole !== 'SUPER_ADMIN' ? dist?.code : undefined,
      policeStationId: newRole === 'SHO' ? ps?.id : undefined,
      policeStationNameEn: newRole === 'SHO' ? ps?.nameEn : undefined,
      policeStationNameHi: newRole === 'SHO' ? ps?.nameHi : undefined,
      policeStationCode: newRole === 'SHO' ? ps?.code : undefined,
      badgeNumber: newBadge.trim() || (newRole === 'SUPER_ADMIN' ? `PHQ-CG-${Math.floor(100 + Math.random() * 900)}` : (newRole === 'SHO' ? `SHO-${ps?.code || 'CG'}` : `ADMIN-${dist?.code || 'CG'}`)),
      mobile: newMobile.trim() || (newRole === 'SUPER_ADMIN' ? '94252XXXX0' : '98261XXXXX'),
      email: `${newUsername.trim()}@cgpolice.gov.in`,
      isActive: true,
      lastLoginAt: 'Never'
    };

    addUser(newUser);
    setShowAddModal(false);
    alert(isDistrictAdmin 
      ? `थाना यूजर ${newUser.username} पासवर्ड सहित सफलतापूर्वक बनाया गया!` 
      : `${newUser.roleLabelHi} (${newUser.username}) पासवर्ड सहित सफलतापूर्वक बनाया गया!`);
  };

  const handleOpenResetModal = (user: UserAccount) => {
    setResetModalUser(user);
    setResetNewPass('');
    setResetSuccessMsg('');
    setShowResetPass(false);
  };

  const handleSaveResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalUser) return;
    if (!resetNewPass.trim()) {
      alert('कृपया नया पासवर्ड दर्ज करें!');
      return;
    }

    resetPassword(resetModalUser.id, resetNewPass.trim());
    setResetSuccessMsg(`पासवर्ड सफलतापूर्वक अपडेट कर दिया गया!`);
    setTimeout(() => {
      setResetModalUser(null);
      setResetSuccessMsg('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-police-navy-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-police-gold-600" />
            <span>
              {isDistrictAdmin 
                ? `थाना यूजर आईडी एवं पासवर्ड प्रबंधन (जिला: ${adminDistrict?.nameHi})`
                : 'राज्यव्यापी उपयोगकर्ता एवं पासवर्ड प्रबंधन (PHQ मुख्यालय)'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi mt-1">
            {isDistrictAdmin 
              ? `अपने जिले (${adminDistrict?.nameHi}) के सभी थानों हेतु SHO लॉगिन आईडी, पासवर्ड निर्माण एवं पासवर्ड रीसेट करें`
              : 'मुख्यालय स्तर से जिला एडमिन एवं थाना यूजर आईडी निर्माण, भूमिका आवंटन व पासवर्ड रीसेट प्रबंधन'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleOpenEditModal()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all active:scale-95 border border-amber-500"
          >
            <UserCog className="w-4 h-4 text-amber-100" />
            <span>यूजर आईडी संशोधन</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="bg-police-navy-800 hover:bg-police-navy-900 text-police-gold-400 px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-police-gold-400" />
            <span>{isDistrictAdmin ? '➕ नया थाना यूजर (SHO ID) बनाएं' : '➕ नया यूजर बनाएं'}</span>
          </button>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <span className="text-xs font-bold text-police-navy-900">
              {isDistrictAdmin 
                ? `आवंटित थाना उपयोगकर्ता सूची (${adminDistrict?.nameHi} जिला)`
                : 'सक्रिय पुलिस उपयोगकर्ता सूची (समस्त छत्तीसगढ़)'}
            </span>
            <span className="ml-2 text-[11px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
              कुल {filteredUsers.length} यूजर
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="यूजरनेम / नाम / थाना खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-police-navy-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b">
              <tr>
                <th className="px-4 py-3">यूजरनेम</th>
                <th className="px-4 py-3">पूरा नाम (अधिकारी)</th>
                <th className="px-4 py-3">भूमिका / पद</th>
                <th className="px-4 py-3">आवंटित जिला एवं थाना</th>
                <th className="px-4 py-3">PNO / बेल्ट नं.</th>
                <th className="px-4 py-3 text-center">खाता स्थिति</th>
                <th className="px-4 py-3 text-center">पासवर्ड स्थिति</th>
                <th className="px-4 py-3">अंतिम लॉगिन</th>
                <th className="px-4 py-3 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400 font-hindi">
                    कोई उपयोगकर्ता नहीं मिला।
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-police-navy-900 text-sm">
                      {u.username}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {u.fullNameHi}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'SUPER_ADMIN' 
                          ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                          : (u.role === 'DISTRICT_ADMIN' 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200')
                      }`}>
                        {u.role === 'SUPER_ADMIN' ? 'मुख्यालय सुपर एडमिन' : (u.role === 'DISTRICT_ADMIN' ? 'जिला एडमिन' : 'थाना प्रभारी (SHO)')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {u.role === 'SUPER_ADMIN' ? (
                        <span className="font-bold text-purple-700">समस्त छत्तीसगढ़ (राज्यव्यापी)</span>
                      ) : (
                        <div>
                          <span className="font-bold text-slate-900">{u.districtNameHi}</span>
                          {u.policeStationNameHi && (
                            <span className="text-police-navy-800 font-semibold block text-[11px]">
                              ➔ {u.policeStationNameHi}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500 font-bold">{u.badgeNumber || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(u.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          u.isActive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {u.isActive ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-rose-600" />}
                        <span>{u.isActive ? 'सक्रिय' : 'निष्क्रिय'}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 rounded-md font-mono">
                        <Lock className="w-2.5 h-2.5 text-police-gold-600" />
                        <span>सक्रिय</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{u.lastLoginAt || 'Never'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(u)}
                          title="नाम, पद, पासवर्ड एवं अन्य विवरण संशोधित करें"
                          className="text-amber-900 hover:text-amber-950 font-bold inline-flex items-center gap-1 text-[11px] bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1.5 rounded-lg shadow-sm transition-all"
                        >
                          <Pencil className="w-3 h-3 text-amber-600" />
                          <span>संशोधन</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenResetModal(u)}
                          className="text-police-navy-800 hover:text-police-navy-950 font-bold inline-flex items-center gap-1 text-[11px] bg-police-gold-50 hover:bg-police-gold-100 border border-police-gold-300 px-2.5 py-1.5 rounded-lg shadow-sm transition-all"
                        >
                          <KeyRound className="w-3 h-3 text-police-gold-600" />
                          <span>पासवर्ड रीसेट</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ADD USER MODAL (With Password Field) */}
      {/* ============================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <form onSubmit={handleCreateUser} className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-300 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-police-navy-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-police-gold-600" />
                  <span>
                    {isDistrictAdmin 
                      ? `नया थाना यूजर (SHO ID) बनाएं - जिला: ${adminDistrict?.nameHi}`
                      : 'नया पुलिस उपयोगकर्ता खाता बनाएं (PHQ / जिला / थाना)'}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 font-hindi">
                  {isDistrictAdmin 
                    ? `थाना आवंटित करें (केवल ${adminDistrict?.nameHi} जिले के थाने)`
                    : 'मुख्यालय सुपर एडमिन, जिला एडमिन अथवा थाना प्रभारी यूजर आईडी बनाएं'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  1. लॉगिन यूजरनेम (User ID) <span className="text-rose-600">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder={isDistrictAdmin ? "उदा. sho_durg_bhilai" : (newRole === 'SUPER_ADMIN' ? "उदा. phq_state_admin" : "उदा. durg_admin")}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  2. अधिकारी का नाम एवं पद <span className="text-rose-600">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="उदा. निरी. संतोष मिश्रा"
                  value={newFullNameHi}
                  onChange={(e) => setNewFullNameHi(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                />
              </div>

              {/* Password Field */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  3. प्रारंभिक पासवर्ड (Password) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="पासवर्ड दर्ज करें (उदा. cgpolice@123)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pr-10 font-mono font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 font-hindi mt-1 block">
                  डिफ़ॉल्ट पासवर्ड 'cgpolice@123' सेट है, इसे आवश्यकतानुसार बदल सकते हैं।
                </span>
              </div>

              {/* Role & District Selection */}
              {isDistrictAdmin ? (
                <div className="sm:col-span-2 bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">भूमिका (स्वतः निर्धारित):</span>
                    <span className="font-bold text-emerald-800 flex items-center gap-1 mt-0.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      थाना प्रभारी (SHO ID)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">जिला (लॉगिन अनुसार लॉक):</span>
                    <span className="font-bold text-police-navy-950 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-police-gold-600" />
                      {adminDistrict?.nameHi} [{adminDistrict?.code}]
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Role Selection for Super Admin */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      4. भूमिका / रोल (Role) <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer"
                    >
                      <option value="SUPER_ADMIN">मुख्यालय सुपर एडमिन (PHQ State Super Admin)</option>
                      <option value="DISTRICT_ADMIN">जिला एडमिन (District Admin)</option>
                      <option value="SHO">थाना प्रभारी (SHO)</option>
                    </select>
                  </div>

                  {/* District Selection for Super Admin / Jurisdiction */}
                  {newRole === 'SUPER_ADMIN' ? (
                    <div className="bg-purple-50 border border-purple-200 p-2.5 rounded-xl flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-700 shrink-0" />
                      <div>
                        <span className="text-[10px] text-purple-700 block font-bold">कार्यक्षेत्र / क्षेत्राधिकार:</span>
                        <span className="font-bold text-purple-950 text-xs">समस्त छत्तीसगढ़ (राज्यव्यापी PHQ मुख्यालय)</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        5. आवंटित जिला <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={newDistrictId}
                        onChange={(e) => setNewDistrictId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer"
                      >
                        {districts.map(d => (
                          <option key={d.id} value={d.id}>{d.nameHi} [{d.code}]</option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}

              {/* Police Station Dropdown (Strictly mapped to the district) */}
              {(newRole === 'SHO' || isDistrictAdmin) && (
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    {isDistrictAdmin ? '4. आवंटित थाना (Police Station)' : '6. आवंटित थाना (Police Station)'} <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={newPsId}
                    onChange={(e) => setNewPsId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer text-xs"
                  >
                    {availablePsList.map(ps => (
                      <option key={ps.id} value={ps.id}>
                        {ps.nameHi || ps.nameEn} [{ps.code}]
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-slate-500 font-hindi mt-1 block">
                    {isDistrictAdmin ? `${adminDistrict?.nameHi} जिले के कुल ${availablePsList.length} थाने उपलब्ध हैं` : `चयनित जिले के कुल ${availablePsList.length} थाने`}
                  </span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">7. बेल्ट / PNO नंबर</label>
                <input
                  type="text"
                  placeholder="उदा. TI-DURG-042"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">8. मोबाइल नंबर</label>
                <input
                  type="text"
                  placeholder="98261XXXXX"
                  value={newMobile}
                  onChange={(e) => setNewMobile(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-police-navy-900 hover:bg-police-navy-950 text-police-gold-400 shadow-md flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>
                  {isDistrictAdmin 
                    ? 'थाना यूजर आईडी बनाएं' 
                    : (newRole === 'SUPER_ADMIN' 
                      ? 'मुख्यालय सुपर एडमिन आईडी बनाएं' 
                      : (newRole === 'DISTRICT_ADMIN' ? 'जिला एडमिन आईडी बनाएं' : 'थाना यूजर आईडी बनाएं'))}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* EDIT USER MODAL (Modify User ID, Name, Role, Password, etc.)   */}
      {/* ============================================================== */}
      {showEditModal && editUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <form onSubmit={handleSaveEditUser} className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-300 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-police-navy-950 flex items-center gap-2">
                    <span>यूजर आईडी विवरण संशोधन एवं संपादन</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-hindi">
                    नाम, पद, पासवर्ड, थाना एवं यूजर आईडी संशोधन
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editSuccessMsg ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{editSuccessMsg}</span>
              </div>
            ) : (
              <>
                {/* User Switcher inside Modal */}
                <div className="bg-amber-50/70 border border-amber-200 p-2.5 rounded-xl">
                  <label className="block text-[11px] font-bold text-amber-950 mb-1">
                    संशोधन हेतु चयनित उपयोगकर्ता (बदलने के लिए दूसरा यूजर चुनें):
                  </label>
                  <select
                    value={editUser.id}
                    onChange={(e) => handleSelectUserToEdit(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs font-bold text-police-navy-950 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    {filteredUsers.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.fullNameHi} — {u.username} [{u.role === 'SUPER_ADMIN' ? 'सुपर एडमिन' : (u.role === 'DISTRICT_ADMIN' ? 'जिला एडमिन' : (u.policeStationNameHi || 'थाना प्रभारी'))}]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* 1. Username / User ID */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      1. यूजर आईडी (लॉगिन यूजरनेम) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="उदा. sho_durg_kotwali"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                    />
                    <span className="text-[10px] text-slate-500 font-hindi mt-0.5 block">
                      लॉगिन करने के लिए यूजर आईडी
                    </span>
                  </div>

                  {/* 2. Full Name / Officer Name */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      2. अधिकारी का नाम एवं पदनाम <span className="text-rose-600">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="उदा. निरी. संतोष मिश्रा"
                      value={editFullNameHi}
                      onChange={(e) => setEditFullNameHi(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                    />
                    <span className="text-[10px] text-slate-500 font-hindi mt-0.5 block">
                      स्क्रीन व रिपोर्ट पर प्रदर्शित नाम
                    </span>
                  </div>

                  {/* 3. Role / Designation */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      3. पद / भूमिका (Role) <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value as any)}
                      disabled={isDistrictAdmin && editRole === 'SHO'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer disabled:bg-slate-100 disabled:text-slate-500"
                    >
                      <option value="SHO">थाना प्रभारी (SHO)</option>
                      {(!isDistrictAdmin || editRole === 'DISTRICT_ADMIN') && (
                        <option value="DISTRICT_ADMIN">जिला एडमिन (District Admin)</option>
                      )}
                      {isSuperAdmin && (
                        <option value="SUPER_ADMIN">मुख्यालय सुपर एडमिन</option>
                      )}
                    </select>
                    <span className="text-[10px] text-slate-500 font-hindi mt-0.5 block">
                      सिस्टम अनुमति स्तर
                    </span>
                  </div>

                  {/* 4. Password Field */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      4. लॉगिन पासवर्ड (Password) <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showEditPassword ? 'text' : 'password'}
                        placeholder="पासवर्ड दर्ज करें"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pr-10 font-mono font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEditPassword(!showEditPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showEditPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 font-hindi mt-0.5 block">
                      सीधे नया पासवर्ड सेट कर सकते हैं
                    </span>
                  </div>

                  {/* 5. District Assignment */}
                  {isDistrictAdmin ? (
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-500 block text-[10px]">5. आवंटित जिला (लॉक):</span>
                      <span className="font-bold text-police-navy-950 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-police-gold-600" />
                        {adminDistrict?.nameHi} [{adminDistrict?.code}]
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        5. आवंटित जिला <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={editDistrictId}
                        onChange={(e) => setEditDistrictId(e.target.value)}
                        disabled={editRole === 'SUPER_ADMIN'}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        {districts.map(d => (
                          <option key={d.id} value={d.id}>{d.nameHi} [{d.code}]</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* 6. Police Station Assignment */}
                  {editRole === 'SHO' ? (
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        6. पदस्थ / आवंटित थाना <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={editPsId}
                        onChange={(e) => setEditPsId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer"
                      >
                        {editAvailablePsList.map(ps => (
                          <option key={ps.id} value={ps.id}>
                            {ps.nameHi || ps.nameEn} [{ps.code}]
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-500 block text-[10px]">6. थाना प्रभार:</span>
                      <span className="font-bold text-slate-600 text-[11px] block mt-1">
                        {editRole === 'SUPER_ADMIN' ? 'समस्त राज्य (मुख्यालय)' : 'समस्त जिला कार्यालय'}
                      </span>
                    </div>
                  )}

                  {/* 7. Belt / PNO Number */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">7. बेल्ट / PNO नंबर</label>
                    <input
                      type="text"
                      placeholder="उदा. TI-DURG-042"
                      value={editBadge}
                      onChange={(e) => setEditBadge(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono text-slate-800"
                    />
                  </div>

                  {/* 8. Mobile Number */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">8. संपर्क मोबाइल नंबर</label>
                    <input
                      type="text"
                      placeholder="उदा. 98261XXXXX"
                      value={editMobile}
                      onChange={(e) => setEditMobile(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono text-slate-800"
                    />
                  </div>

                  {/* 9. Account Status Toggle */}
                  <div className="sm:col-span-2 bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">खाता सक्रियता स्थिति (Account Active Status)</span>
                      <span className="text-[11px] text-slate-500 font-hindi">
                        {editIsActive ? 'यह यूजर पोर्टल में लॉगिन कर सकता है' : 'यह यूजर पोर्टल में लॉगिन नहीं कर सकेगा'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditIsActive(!editIsActive)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        editIsActive
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-rose-600 text-white shadow-sm'
                      }`}
                    >
                      {editIsActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span>{editIsActive ? 'सक्रिय (Active)' : 'निष्क्रिय (Deactivated)'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>संशोधन सुरक्षित करें</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* RESET PASSWORD MODAL */}
      {/* ============================================================== */}
      {resetModalUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <form onSubmit={handleSaveResetPassword} className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-300 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-police-gold-500/20 text-police-gold-600 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-police-navy-950">
                    पासवर्ड रीसेट करें
                  </h3>
                  <p className="text-[11px] text-slate-500 font-hindi">
                    अधिकारी: {resetModalUser.fullNameHi}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setResetModalUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {resetSuccessMsg ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{resetSuccessMsg}</span>
              </div>
            ) : (
              <>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">यूजरनेम:</span>
                    <span className="font-mono font-bold text-police-navy-900">{resetModalUser.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">भूमिका:</span>
                    <span className="font-bold text-slate-800">{resetModalUser.roleLabelHi}</span>
                  </div>
                  {resetModalUser.policeStationNameHi && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">थाना:</span>
                      <span className="font-bold text-slate-800">{resetModalUser.policeStationNameHi}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    नया पासवर्ड दर्ज करें <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={showResetPass ? 'text' : 'password'}
                      placeholder="नया पासवर्ड दर्ज करें (उदा. Cgpolice@2026)"
                      value={resetNewPass}
                      onChange={(e) => setResetNewPass(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pr-10 text-xs font-mono font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-gold-500"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPass(!showResetPass)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showResetPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => setResetModalUser(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-police-navy-950 hover:bg-police-navy-900 text-police-gold-400 flex items-center gap-1.5 shadow"
                  >
                    <Check className="w-4 h-4" />
                    <span>पासवर्ड अपडेट करें</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      )}

    </div>
  );
};
