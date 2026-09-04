import express from 'express';
const router = express.Router();
import { query } from './db.js';
// 1. Route for the Landing / Login Page
router.get('/', async(req, res) => {


     
    const dashboardStats = {
        totalInspections: "1,284",
        complianceRate: 92,
        pendingReview: 47,
        noticesIssued: 18
    };

    // AI एक्सट्रैक्शन के लिए डमी डेटा (यही fieldsData एरर को फिक्स करेगा)
    const extractedFields = [
        { field: 'Product Name', value: 'Premium Assam Tea', conf: 98, ok: true },
        { field: 'Net Quantity', value: '500 g', conf: 95, ok: true },
        { field: 'MRP (incl. taxes)', value: '₹ 245.00', conf: 93, ok: true },
        { field: 'Manufacturer', value: 'Assam Valley Estates Pvt. Ltd.', conf: 90, ok: true },
        { field: 'Consumer Care', value: 'Not Detected', conf: 82, ok: false },
    ];

    // metrix.ejs को रेंडर करना और सारा डेटा पास करना
    res.render('metrix', { 
        pageTitle: 'Legal Metrology Dashboard',
        stats: dashboardStats,
        fieldsData: extractedFields
    });
});

// 2. Route for the Inspector Dashboard (New Inspection)
router.get('/dashboard', (req, res) => {
    const dashboardStats = {
        totalInspections: "1,284",
        complianceRate: 92,
        pendingReview: 47,
        noticesIssued: 18
    };

    const extractedFields = [
        { field: 'Product Name', value: 'Premium Assam Tea', conf: 98, ok: true },
        { field: 'Net Quantity', value: '500 g', conf: 95, ok: true },
        { field: 'MRP (incl. taxes)', value: '₹ 245.00', conf: 93, ok: true },
        { field: 'Manufacturer', value: 'Assam Valley Estates Pvt. Ltd.', conf: 90, ok: true },
        { field: 'Consumer Care', value: 'Not Detected', conf: 82, ok: false },
    ];

    // Renders views/dashboard.ejs
    res.render('inDashboard', { 
        pageTitle: 'Dashboard - Legal Metrology',
        stats: dashboardStats,
        fieldsData: extractedFields
    });
});

// Optional: Handle the POST login from the landing page
router.post('/login', (req, res) => {
    const { role } = req.body;
    if (role === 'inspector') {
        res.redirect('/dashboard');
    } else {
        res.redirect('/'); // Or redirect to a citizen dashboard
    }
});
// Route for viewing a specific inspection report
router.get('/report', (req, res) => {
    // In a real application, you would fetch this data from your database using req.params.id
  
    const reportData = {
        id: req.params.id || "LM-2026-98745",
        date: "04 September 2026",
        productName: "Premium Assam Tea (500g)",
        status: "NON-COMPLIANT", 
        source: "Physical Package Scan (3 Images)",
        finding: {
            title: "Missing Consumer Care Details",
            rule: "Rule 6(2)",
            reference: "Packaged Commodities Rules, 2011 — Rule 6(2)",
            confidence: 98,
            description: "Multi-surface scan completed. Text extraction confidence 98%. Fields for Email and Telephone were not detected on any panel.",
            isViolation: true
        },
        inspector: {
            name: "Inspector Sharma",
            initials: "IS",
            notes: "Reviewed AI extraction. Confirmed that the packaging lacks the mandatory consumer care contact information required by the latest 2026 amendment. Forwarding for official notice."
        }
    };

    res.render('report', { 
        pageTitle: `Report ${reportData.id} - Legal Metrology`,
        report: reportData 
    });
});
// Route for the Rule Repository Page
router.get('/repository', (req, res) => {
    // Repository stats data
    const repoStats = {
        activeRules: 3,
        machineReadable: "100%",
        latestAmendment: 2026,
        engineVersion: "v3.2"
    };

    // The rules data to inject into the frontend for rendering and searching
    const rulesData = [
        { id: 'Rule 6(1)(a)', decl: 'Name and address of Manufacturer', cond: 'All packaged commodities', amend: 'Base 2011 Rules', tag: 'base' },
        { id: 'Rule 6(1)(d)', decl: 'Month and Year of Manufacture', cond: 'Exempt for food articles governed by FSSAI', amend: 'Amendment 2022', tag: 'amend' },
        { id: 'Rule 6(2)', decl: 'Consumer Care Details', cond: 'Must include Name, Address, Telephone, Email', amend: 'Third Amendment Rules, 2026', tag: 'new' }
    ];

    res.render('repository', { 
        pageTitle: 'Rule Repository - Legal Metrology',
        stats: repoStats,
        rules: rulesData
    });
});
export default router;