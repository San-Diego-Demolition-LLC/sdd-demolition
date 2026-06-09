/* ============================================================
   SDD Operations System — Shared data layer (sdd-data.js)
   One single source of truth for all modules.
   - Seeds default data the first time.
   - Persists every change to the browser (localStorage).
   - Each module reads/writes through window.SDD.
   ============================================================ */
(function(){
  var STORAGE_KEY = 'sdd_data_v1';

  // ---- DEFAULT SEED DATA (used the first time, before anything is saved) ----
  var SEED = {
    customers: [
  {id:1, name:'ABC Construction Corp', city:'San Diego, CA',
   address:'4500 Main St, San Diego CA 92103', phone:'(619) 555-0142',
   since:'2023', type:'commercial', waiver:'conditional', portal:false, notes:'', specialInstructions:false, billingMethod:'direct-email', sov:true, sovEstimates:[],
   contacts:[
     {id:'c1', name:'Maria Rodriguez', initials:'MR', color:'av-info', role:'billing',
      email:'billing@abcconstruction.com', phone:'(619) 555-0101', title:'Billing Manager', jobs:[]},
     {id:'c2', name:'James Torres', initials:'JT', color:'av-gold', role:'project-manager',
      email:'j.torres@abcconstruction.com', phone:'(619) 555-0102', title:'Project Manager',
      jobs:[
        {est:'EST-047', address:'1420 Harbor Blvd', city:'San Diego CA 92101', status:'In progress', amount:'$14,301', date:'May 2, 2026', projectName:'Harbor Blvd Demolition',
          estimates:[
            {est:'EST-047',amount:'$14,301',status:'Paid',date:'May 2, 2026',scope:'Original Scope - Demolition'},
            {est:'EST-052',amount:'$8,200',status:'Approved',date:'May 5, 2026',scope:'Revised Scope - Debris Removal'}
          ],
          changeOrders:[
            {est:'EST-CO047-1',originalEst:'EST-047',amount:'$2,100',status:'Approved',date:'May 10, 2026',description:'Additional haul-off - 3 loads'},
            {est:'EST-CO052-1',originalEst:'EST-052',amount:'$950',status:'Pending',date:'May 12, 2026',description:'Hazmat disposal - asbestos tile'}
          ],
          invoices:[
            {est:'INV-047-1',originalEst:'EST-047',amount:'$14,301',status:'Paid',date:'May 15, 2026',due:'Jun 14, 2026'},
            {est:'INV-047-2',originalEst:'EST-047',amount:'$2,100',status:'Paid',date:'May 18, 2026',due:'Jun 17, 2026'}
          ]},
        {est:'EST-051', address:'880 5th Ave', city:'San Diego CA 92101', status:'Pending approval', amount:'$9,850', date:'May 8, 2026', projectName:'5th Ave Demo',
          estimates:[
            {est:'EST-051',amount:'$9,850',status:'Pending approval',date:'May 8, 2026',scope:'Site Demo - Full Clearance'}
          ],
          changeOrders:[
            {est:'EST-CO051-1',originalEst:'EST-051',amount:'$1,400',status:'Pending',date:'May 14, 2026',description:'Underground pipe removal'}
          ],
          invoices:[]},
        {est:'EST-044', address:'210 Market St', city:'San Diego CA 92101', status:'Completed', amount:'$18,750', date:'Mar 12, 2026', projectName:'Market St Teardown',
          billing:[{id:'c1',name:'Maria Rodriguez',email:'billing@abcconstruction.com',phone:'(619) 555-0101'},{id:'c4',name:'Robert Park',email:'r.park@abcconstruction.com',phone:'(619) 555-0104'}],
          pendingBilling:false,
          estimates:[
            {est:'EST-044',amount:'$18,750',status:'Paid',date:'Mar 12, 2026',scope:'Full Structure Demolition'}
          ],
          changeOrders:[
            {est:'EST-CO044-1',originalEst:'EST-044',amount:'$3,200',status:'Approved',date:'Mar 20, 2026',description:'Concrete slab breakout'}
          ],
          invoices:[
            {est:'INV-044-1',originalEst:'EST-044',amount:'$18,750',status:'Paid',date:'Mar 25, 2026',due:'Apr 24, 2026'},
            {est:'INV-044-2',originalEst:'EST-044',amount:'$3,200',status:'Paid',date:'Mar 28, 2026',due:'Apr 27, 2026'}
          ]},
      ]},
     {id:'c3', name:'Sandra Lee', initials:'SL', color:'av-warning', role:'project-manager',
      email:'s.lee@abcconstruction.com', phone:'(619) 555-0103', title:'Site Supervisor',
      jobs:[
        {est:'EST-055', address:'342 Third Ave', city:'Chula Vista CA 91910', status:'Pending scheduled', amount:'$22,500', date:'Apr 28, 2026'},
      ]},
     {id:'c4', name:'Robert Park', initials:'RP', color:'av-success', role:'additional',
      email:'r.park@abcconstruction.com', phone:'(619) 555-0104', title:'Director',
      jobs:[
        {est:'EST-060', address:'7700 Mission Valley Rd', city:'San Diego CA 92108', status:'Ready to bill', amount:'$31,200', date:'Apr 10, 2026'},
      ]},
   ]},
  {id:2, name:'Horizon Builders LLC', city:'Chula Vista, CA',
   address:'1200 Broadway, Chula Vista CA 91910', phone:'(619) 555-0200',
   since:'2024', type:'commercial', waiver:'unconditional', portal:true, notes:'Portal billing only.', specialInstructions:false, billingMethod:'client-portal', sov:false, sovEstimates:[],
   contacts:[
     {id:'c5', name:'David Chen', initials:'DC', color:'av-gold', role:'project-manager',
      email:'d.chen@horizonbuilders.com', phone:'(619) 555-0201', title:'Owner',
      jobs:[
        {est:'EST-038', address:'901 National City Blvd', city:'National City CA 91950', status:'Completed', amount:'$18,700', date:'Mar 15, 2026'},
        {est:'EST-062', address:'450 Broadway', city:'Chula Vista CA 91910', status:'In progress', amount:'$11,400', date:'May 5, 2026'},
      ]},
     {id:'c6', name:'Priya Nair', initials:'PN', color:'av-info', role:'billing',
      email:'billing@horizonbuilders.com', phone:'(619) 555-0202', title:'Billing', jobs:[]},
   ]},
  {id:3, name:'Pacific Coast Development', city:'Oceanside, CA',
   address:'2800 Harbor Dr, Oceanside CA 92054', phone:'(760) 555-0310',
   since:'2024', type:'commercial', waiver:'conditional', portal:false, notes:'', specialInstructions:false, billingMethod:'direct-email', sov:false, sovEstimates:[],
   contacts:[
     {id:'c7', name:'Tom Reyes', initials:'TR', color:'av-warning', role:'project-manager',
      email:'t.reyes@paccoast.com', phone:'(760) 555-0311', title:'Project Manager',
      jobs:[
        {est:'EST-044', address:'510 Pier View Way', city:'Oceanside CA 92054', status:'Pending approval', amount:'$7,600', date:'May 6, 2026'},
      ]},
     {id:'c8', name:'Lisa Fontaine', initials:'LF', color:'av-info', role:'billing',
      email:'accounts@paccoast.com', phone:'(760) 555-0312', title:'Accounts', jobs:[]},
   ]},
  {id:4, name:'Silverstone Group', city:'El Cajon, CA',
   address:'955 Magnolia Ave, El Cajon CA 92020', phone:'(619) 555-0400',
   since:'2025', type:'residential', waiver:'none', portal:false, notes:'', specialInstructions:false, billingMethod:'direct-email', sov:false, sovEstimates:[],
   contacts:[
     {id:'c9', name:'Marcus Webb', initials:'MW', color:'av-success', role:'project-manager',
      email:'m.webb@silverstone.com', phone:'(619) 555-0401', title:'Owner',
      jobs:[
        {est:'EST-033', address:'1100 Magnolia Ave', city:'El Cajon CA 92020', status:'Completed', amount:'$5,200', date:'Feb 20, 2026'},
      ]},
   ]},
],
    estimates: [
  {id:1, num:'EST-047', isChangeOrder:false, customer:'ABC Construction Corp',
   contact:'James Torres', createdBy:'Carlos Mendez',
   address:'1420 Harbor Blvd, San Diego', jobAddress:'1420 Harbor Blvd, San Diego CA 92101',
   companyAddress:'4500 Main St, San Diego CA 92103',
   jobName:'Harbor Blvd Demo Phase 1', poNumber:'PO-4891', requiresSOV:true, requiresWaivers:true, termsType:'commercial-demolition', termsLabel:'Note - Commercial Tear Down', termsText:'COMMERCIAL TEAR DOWN - San Diego Deconstruction & Demolition Is Not Responsible For Construction fencing, Erosion Control. All Electrical & Plumbing To Be Safed Off By G.C. Prior To Demo Starting. SDD Is Not Responsible For Leaks. Payment In Full Is Due Net/15 From The Day Of Completion.',
   status:'in-progress', amount:13150, date:'May 2, 2026',
   lines:[
     {desc:'Interior demolition — 2nd floor',    qty:1800, unit:'sq ft', unitPrice:5.00,  total:9000},
     {desc:'Debris removal & hauling',            qty:3,    unit:'loads', unitPrice:900,   total:2700},
     {desc:'Dumpster rental (7 days)',            qty:1,    unit:'unit',  unitPrice:850,   total:850},
     {desc:'Dust protection & containment',      qty:1,    unit:'job',   unitPrice:600,   total:600},
   ],
   invoices:[
     {num:'INV-047-1', date:'May 15, 2026', amount:6575, status:'Paid'},
     {num:'INV-047-2', date:'May 20, 2026', amount:6575, status:'Unpaid'}
   ],
   vendorBills:[
     {vendor:'West Coast Hauling', account:'5010 · Disposal', amount:1800, status:'Paid'},
     {vendor:'Pacific Equipment Rental', account:'5020 · Equipment', amount:850, status:'Pending'},
     {vendor:'City Permits Office', account:'5040 · Permits', amount:350, status:'Pending'}
   ],
   schedStart:'May 13, 2026', schedEnd:'May 17, 2026', schedTime:'07:00', schedDays:'5 days',
   foreman:'Carlos Mendez', waiver:'conditional', payment:'Net 30',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Carlos Mendez', date:'May 2, 2026', color:'#7C5CBF'},
     {action:'Sent to client → Pending Approval', by:'System', date:'May 2, 2026', color:'#3A7ED4'},
     {action:'📧 Notification sent to Carlos Mendez: client received estimate', by:'System', date:'May 2, 2026', color:'#AAA'},
     {action:'Client approved & signed — James Torres', by:'James Torres', date:'May 4, 2026', color:'#3A9E6A'},
     {action:'📧 Notification sent to Carlos Mendez: client approved EST-047', by:'System', date:'May 4, 2026', color:'#3A9E6A'},
     {action:'Status → Approved · Pending Scheduling', by:'System', date:'May 4, 2026', color:'#B8922A'},
     {action:'Job scheduled: May 13–17 · 07:00 · 5 days', by:'Carlos Mendez', date:'May 7, 2026', color:'#C8822A'},
     {action:'📧 Notification sent to Admin: job scheduled on calendar', by:'System', date:'May 7, 2026', color:'#3A7ED4'},
     {action:'Status → In Progress', by:'System', date:'May 13, 2026', color:'#C8822A'},
   ]},
  {id:2, num:'EST-051', isChangeOrder:false, customer:'ABC Construction Corp',
   contact:'James Torres', createdBy:'Ana Rivera',
   address:'880 5th Ave, San Diego', jobAddress:'880 5th Ave, San Diego CA 92103',
   companyAddress:'4500 Main St, San Diego CA 92103',
   jobName:'5th Ave Teardown', poNumber:'PO-5102', termsType:'interior-demolition', termsLabel:'Note - Interior Residential', termsText:'INTERIOR DEMOLITION NOTES San Diego Deconstruction & Demolition Is Not Responsible For Obtaining Permits, All Electrical & Plumbing To Be Safed Off By G.C. Prior To Demo Starting. Payment In Full Is Due Net/15 From The Day Of Completion.',
   status:'pending-approval', amount:9850,
   lines:[
     {desc:'Selective interior demo — kitchen & bathrooms', qty:1200, unit:'sq ft', unitPrice:4.50, total:5400},
     {desc:'Debris hauling',                               qty:2,    unit:'loads', unitPrice:900,  total:1800},
     {desc:'Dumpster rental (5 days)',                    qty:1,    unit:'unit',  unitPrice:750,  total:750},
     {desc:'Site protection & dust barriers',            qty:1,    unit:'job',   unitPrice:500,  total:500},
   ], date:'May 8, 2026',
   schedStart:'', schedEnd:'', waiver:'conditional', payment:'50% deposit',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Ana Rivera', date:'May 8, 2026', color:'#7C5CBF'},
     {action:'Sent to client → Pending Approval', by:'System', date:'May 8, 2026', color:'#3A7ED4'},
     {action:'📧 Notification sent to Ana Rivera: estimate sent to client', by:'System', date:'May 8, 2026', color:'#AAA'},
   ]},
  {id:3, num:'EST-055', isChangeOrder:false, customer:'ABC Construction Corp',
   contact:'Sandra Lee', createdBy:'Carlos Mendez',
   address:'342 Third Ave, Chula Vista', jobAddress:'342 Third Ave, Chula Vista CA 91910',
   companyAddress:'4500 Main St, San Diego CA 92103',
   jobName:'Chula Vista Interior Demo', poNumber:'', termsType:'interior-demolition', termsLabel:'Note - Interior Residential', termsText:'INTERIOR DEMOLITION NOTES San Diego Deconstruction & Demolition Is Not Responsible For Obtaining Permits. Payment In Full Is Due Net/15 From The Day Of Completion.',
   status:'approved', amount:22500,
   lines:[
     {desc:'Full interior demolition — 3 floors',    qty:4500, unit:'sq ft', unitPrice:3.80, total:17100},
     {desc:'Debris removal & hauling',               qty:4,    unit:'loads', unitPrice:900,  total:3600},
     {desc:'Dumpster rental (10 days)',              qty:1,    unit:'unit',  unitPrice:1100, total:1100},
     {desc:'Dust containment',                      qty:1,    unit:'job',   unitPrice:700,  total:700},
   ], date:'Apr 28, 2026',
   schedStart:'', schedEnd:'', waiver:'none', payment:'Net 15',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Carlos Mendez', date:'Apr 28, 2026', color:'#7C5CBF'},
     {action:'Sent to client → Pending Approval', by:'System', date:'Apr 28, 2026', color:'#3A7ED4'},
     {action:'Client approved & signed — Sandra Lee', by:'Sandra Lee', date:'Apr 30, 2026', color:'#3A9E6A'},
     {action:'📧 Notification sent to Carlos Mendez: client approved EST-055 — schedule required', by:'System', date:'Apr 30, 2026', color:'#3A9E6A'},
     {action:'Status → Approved · Pending Scheduling', by:'System', date:'Apr 30, 2026', color:'#B8922A'},
   ]},
  {id:4, num:'EST-060', isChangeOrder:false, customer:'ABC Construction Corp',
   contact:'Robert Park', createdBy:'Ana Rivera',
   address:'7700 Mission Valley Rd, San Diego', jobAddress:'7700 Mission Valley Rd, San Diego CA 92108',
   companyAddress:'4500 Main St, San Diego CA 92103',
   jobName:'Mission Valley Commercial Demo', poNumber:'PO-6010', termsType:'commercial-demolition', termsLabel:'Note - Commercial Tear Down', termsText:'COMMERCIAL TEAR DOWN - San Diego Deconstruction & Demolition Is Not Responsible For Construction fencing. Payment In Full Is Due Net/15 From The Day Of Completion.',
   status:'ready-to-bill', amount:31200,
   lines:[
     {desc:'Full building demolition — Mission Valley',  qty:8000, unit:'sq ft', unitPrice:3.10, total:24800},
     {desc:'Debris removal & hauling',                  qty:5,    unit:'loads', unitPrice:900,  total:4500},
     {desc:'Dumpster rental (14 days)',                 qty:1,    unit:'unit',  unitPrice:1200, total:1200},
     {desc:'Site fencing & protection',                qty:1,    unit:'job',   unitPrice:700,  total:700},
   ], date:'Apr 10, 2026',
   schedStart:'Apr 14, 2026', schedEnd:'Apr 30, 2026', schedDays:'12 days',
   foreman:'Ana Rivera', waiver:'conditional', payment:'Progress billing',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Ana Rivera', date:'Apr 10, 2026', color:'#7C5CBF'},
     {action:'Sent to client → Pending Approval', by:'System', date:'Apr 10, 2026', color:'#3A7ED4'},
     {action:'Client approved & signed — Robert Park', by:'Robert Park', date:'Apr 12, 2026', color:'#3A9E6A'},
     {action:'📧 Notification sent to Ana Rivera: client approved — schedule required', by:'System', date:'Apr 12, 2026', color:'#3A9E6A'},
     {action:'Job scheduled: Apr 14–30 · 07:00 · 12 days', by:'Ana Rivera', date:'Apr 13, 2026', color:'#C8822A'},
     {action:'📧 Notification sent to Admin: EST-060 scheduled on calendar', by:'System', date:'Apr 13, 2026', color:'#3A7ED4'},
     {action:'Status → In Progress', by:'System', date:'Apr 14, 2026', color:'#C8822A'},
     {action:'Job completed — marked by Ana Rivera', by:'Ana Rivera', date:'Apr 30, 2026', color:'#3A9E6A'},
     {action:'📧 Notification sent to Admin: EST-060 job completed — Ready to Bill', by:'System', date:'Apr 30, 2026', color:'#D94F4F'},
     {action:'Status → Ready to Bill', by:'System', date:'Apr 30, 2026', color:'#D94F4F'},
   ]},
  {id:5, num:'EST-038', isChangeOrder:false, customer:'Horizon Builders LLC',
   contact:'David Chen', createdBy:'Carlos Mendez',
   address:'901 National City Blvd, National City', jobAddress:'901 National City Blvd, National City CA 91950',
   companyAddress:'1200 Broadway, Chula Vista CA 91910',
   jobName:'National City Full Demo', poNumber:'HB-0038', termsType:'residential-teardown', termsLabel:'Note - Residential Teardown', termsText:'RESIDENTIAL TEAR DOWN DEMOLITION NOTES: San Diego Deconstruction & Demolition Is Not Responsible For Obtaining Permits. Payment In Full Is Due Net/15 From The Day Of Completion.',
   status:'payment-received', amount:18700,
   lines:[
     {desc:'Residential teardown — National City',   qty:2800, unit:'sq ft', unitPrice:5.00, total:14000},
     {desc:'Debris hauling',                         qty:3,    unit:'loads', unitPrice:900,  total:2700},
     {desc:'Dumpster (7 days)',                     qty:1,    unit:'unit',  unitPrice:850,  total:850},
     {desc:'Site cleanup',                          qty:1,    unit:'job',   unitPrice:650,  total:650},
   ], date:'Mar 15, 2026',
   schedStart:'Mar 18, 2026', schedEnd:'Mar 30, 2026', schedDays:'10 days',
   foreman:'Carlos Mendez', waiver:'unconditional', payment:'Net 30',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Carlos Mendez', date:'Mar 15, 2026', color:'#7C5CBF'},
     {action:'Client approved & signed — David Chen', by:'David Chen', date:'Mar 17, 2026', color:'#3A9E6A'},
     {action:'Job scheduled: Mar 18–30', by:'Carlos Mendez', date:'Mar 18, 2026', color:'#C8822A'},
     {action:'Job completed', by:'Carlos Mendez', date:'Mar 30, 2026', color:'#3A9E6A'},
     {action:'📧 Admin notified: job completed — Ready to Bill', by:'System', date:'Mar 30, 2026', color:'#D94F4F'},
     {action:'Invoice sent to David Chen — $18,700', by:'Admin', date:'Mar 31, 2026', color:'#3A7ED4'},
     {action:'Status → Invoice Sent · AR', by:'System', date:'Mar 31, 2026', color:'#3A7ED4'},
     {action:'Payment received in full — ACH', by:'Admin', date:'Apr 10, 2026', color:'#3A9E6A'},
     {action:'Unconditional waiver sent', by:'System', date:'Apr 10, 2026', color:'#3A9E6A'},
     {action:'Status → Payment Received', by:'System', date:'Apr 10, 2026', color:'#3A9E6A'},
   ]},
  {id:6, num:'EST-044', isChangeOrder:false, customer:'Pacific Coast Development',
   altAmt:9600,
   contact:'Tom Reyes', createdBy:'Ana Rivera',
   address:'510 Pier View Way, Oceanside', jobAddress:'510 Pier View Way, Oceanside CA 92054',
   companyAddress:'2800 Harbor Dr, Oceanside CA 92054',
   jobName:'Pier View Demo', poNumber:'', termsType:'concrete-demolition', termsLabel:'Note - Concrete Demolition', termsText:'CONCRETE DEMOLITION NOTES: San Diego Deconstruction & Demolition Is Not Responsible For Obtaining Permits. Payment In Full Is Due Net/15 From The Day Of Completion.',
   status:'estimate-pending', amount:7600, date:'May 6, 2026',
   schedStart:'', schedEnd:'', waiver:'conditional', payment:'Net 30',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Ana Rivera', date:'May 6, 2026', color:'#7C5CBF'},
   ]},
  {id:11, num:'EST-CO070-1', isChangeOrder:true, originalId:8, originalNum:'EST-070',
   coSequence:1, customer:'ABC Construction Corp',
   contact:'James Torres', createdBy:'Carlos Mendez',
   address:'2200 Pacific Hwy, San Diego', jobAddress:'2200 Pacific Hwy, San Diego CA 92101',
   companyAddress:'4500 Main St, San Diego CA 92103',
   jobName:'Pacific Hwy Demo — CO #1',
   poNumber:'PO-7001', reason:'Scope addition — concrete cutting',
   description:'Additional concrete cutting requested by GC on ground floor slab.',
   status:'estimate-pending', amount:22700, netChange:4200, date:'May 20, 2026',
   schedStart:'', schedEnd:'', waiver:'conditional', payment:'Net 30',
   termsType:'concrete-demolition',
   termsLabel:'Concrete Demolition',
   termsText:'Estimate pricing is based on a clear and unobstructed path for demolition activities.',
   lines:[
     {desc:'Concrete cutting — ground floor slab', qty:300, unit:'sq ft', unitPrice:8.00, total:2400},
     {desc:'Concrete debris hauling',              qty:2,   unit:'loads', unitPrice:900,  total:1800},
   ],
   timeline:[
     {action:'Change order created from EST-070', by:'Carlos Mendez', date:'May 20, 2026', color:'#C8822A'},
   ]},
  {id:8, num:'EST-070', isChangeOrder:false, customer:'ABC Construction Corp',
   contact:'James Torres', createdBy:'Carlos Mendez',
   address:'2200 Pacific Hwy, San Diego', jobAddress:'2200 Pacific Hwy, San Diego CA 92101',
   companyAddress:'4500 Main St, San Diego CA 92103',
   jobName:'Pacific Hwy Commercial Demo', poNumber:'PO-7001',
   status:'estimate-pending', amount:18500, altAmt:14200, date:'May 19, 2026',
   schedStart:'', schedEnd:'', waiver:'conditional', payment:'Net 30',
   termsType:'commercial-demolition',
   termsLabel:'Note - Commercial Tear Down',
   termsText:'COMMERCIAL TEAR DOWN - San Diego Deconstruction & Demolition Is Not Responsible For Construction fencing, Erosion Control. Payment In Full Is Due Net/15 From The Day Of Completion.',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Carlos Mendez', date:'May 19, 2026', color:'#7C5CBF'},
   ]},
{id:9, num:'EST-080', isChangeOrder:false, customer:'Horizon Builders LLC',
   contact:'David Chen', createdBy:'Ana Rivera',
   address:'3800 Fifth Ave, Hillcrest', jobAddress:'3800 Fifth Ave, Hillcrest, San Diego CA 92103',
   companyAddress:'1200 Broadway, Chula Vista CA 91910',
   jobName:'Hillcrest Office Building Demo', poNumber:'HB-0080',
   status:'pending-approval', amount:34800,
   lines:[
     {desc:'Interior demolition — floors 1–3',      qty:3600, unit:'sq ft', unitPrice:3.95, total:14220},
     {desc:'Debris removal & hauling',               qty:8,    unit:'loads', unitPrice:900,  total:7200},
     {desc:'Dumpster rental (14 days)',              qty:2,    unit:'unit',  unitPrice:1450, total:2900},
     {desc:'Dust containment & site protection',    qty:1,    unit:'job',   unitPrice:2800, total:2800},
     {desc:'Structural demolition — load-bearing',  qty:1,    unit:'job',   unitPrice:7680, total:7680},
   ], date:'May 20, 2026',
   schedStart:'', schedEnd:'', waiver:'conditional', payment:'Net 30',
   termsType:'commercial-demolition',
   termsLabel:'Note - Commercial Tear Down',
   termsText:'COMMERCIAL TEAR DOWN - San Diego Deconstruction & Demolition Is Not Responsible For Construction fencing, Erosion Control. - All Electrical & Plumbing To Be Safed Off By G.C. Prior To Demo Starting. - SDD Is Not Responsible For Leaks. - Payment In Full Is Due Net/15 From The Day Of Completion. - A Monthly Late Fee of 1% of the Total Amount Due Will be Charged on Overdue Payments. - By Commencing the Work Outlined in This Estimate, Customer Agrees to the Terms & Conditions/Notes Stipulated Within. - GC responsible for SDG&E disconnect.',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Ana Rivera', date:'May 20, 2026', color:'#7C5CBF'},
     {action:'Sent to client → Pending Approval', by:'System', date:'May 20, 2026', color:'#3A7ED4'},
     {action:'📧 Notification sent to Ana Rivera: estimate sent to client', by:'System', date:'May 20, 2026', color:'#AAA'},
   ]},
  {id:10, num:'EST-CO080-1', isChangeOrder:true, originalId:9, originalNum:'EST-080',
   coSequence:1, customer:'Horizon Builders LLC',
   contact:'David Chen', createdBy:'Ana Rivera',
   address:'3800 Fifth Ave, Hillcrest', jobAddress:'3800 Fifth Ave, Hillcrest, San Diego CA 92103',
   companyAddress:'1200 Broadway, Chula Vista CA 91910',
   jobName:'Hillcrest Office Building Demo — CO #1',
   poNumber:'HB-0080', reason:'Scope addition — client request',
   description:'Client requested additional concrete cutting on basement level and hazmat abatement for asbestos found in ceiling tiles.',
   status:'pending-approval', amount:43600, netChange:8800, date:'May 21, 2026',
   lines:[
     {desc:'Concrete cutting — basement level', qty:400,  unit:'sq ft', unitPrice:8.00, total:3200},
     {desc:'Concrete debris hauling',           qty:2,    unit:'loads', unitPrice:900,  total:1800},
     {desc:'Hazmat abatement — asbestos tiles', qty:1,    unit:'job',   unitPrice:3800, total:3800},
   ],
   schedStart:'', schedEnd:'', waiver:'conditional', payment:'Net 30',
   termsType:'commercial-demolition',
   termsLabel:'Note - Commercial Tear Down',
   termsText:'COMMERCIAL TEAR DOWN - San Diego Deconstruction & Demolition Is Not Responsible For Construction fencing, Erosion Control. - All Electrical & Plumbing To Be Safed Off By G.C. Prior To Demo Starting. - SDD Is Not Responsible For Leaks. - Payment In Full Is Due Net/15 From The Day Of Completion. - A Monthly Late Fee of 1% of the Total Amount Due Will be Charged on Overdue Payments.',
   timeline:[
     {action:'Change order created from EST-080 — reason: Scope addition — client request', by:'Ana Rivera', date:'May 21, 2026', color:'#C8822A'},
     {action:'Sent to client → Pending Approval', by:'System', date:'May 21, 2026', color:'#3A7ED4'},
     {action:'📧 Notification sent to Ana Rivera: change order sent to client', by:'System', date:'May 21, 2026', color:'#AAA'},
   ]},
  {id:7, num:'EST-044B', isChangeOrder:false, customer:'Silverstone Group',
   contact:'Marcus Webb', createdBy:'Carlos Mendez',
   address:'1100 Magnolia Ave, El Cajon', jobAddress:'1100 Magnolia Ave, El Cajon CA 92020',
   companyAddress:'955 Magnolia Ave, El Cajon CA 92020',
   jobName:'Magnolia Residential Demo', poNumber:'', termsType:'residential-teardown', termsLabel:'Note - Residential Teardown', termsText:'RESIDENTIAL TEAR DOWN DEMOLITION NOTES: San Diego Deconstruction & Demolition Is Not Responsible For Obtaining Permits. Payment In Full Is Due Net/15 From The Day Of Completion.',
   status:'rejected', amount:5200, date:'Feb 20, 2026',
   rejectionReason:'Price too high', rejectionNotes:'Client requested a lower quote.',
   schedStart:'', schedEnd:'', waiver:'none', payment:'Due on completion',
   timeline:[
     {action:'Estimate created — Estimate Pending', by:'Carlos Mendez', date:'Feb 20, 2026', color:'#7C5CBF'},
     {action:'Sent to client → Pending Approval', by:'System', date:'Feb 20, 2026', color:'#3A7ED4'},
     {action:'Client rejected estimate — Reason: Price too high', by:'Marcus Webb', date:'Feb 22, 2026', color:'#D94F4F'},
     {action:'📧 Notification sent to Carlos Mendez: client rejected EST-044B', by:'System', date:'Feb 22, 2026', color:'#D94F4F'},
     {action:'Status → Estimate Rejected', by:'System', date:'Feb 22, 2026', color:'#D94F4F'},
   ]},
]
  };

  // ---- Load from storage or seed ----
  function load(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if(raw){ return JSON.parse(raw); }
    } catch(e){ console.warn('SDD: could not read storage', e); }
    return JSON.parse(JSON.stringify(SEED)); // deep copy of seed
  }

  var _data = load();
  // Make sure every collection exists even if storage was partial
  if(!_data.customers) _data.customers = JSON.parse(JSON.stringify(SEED.customers));
  if(!_data.estimates) _data.estimates = JSON.parse(JSON.stringify(SEED.estimates));

  function save(){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(_data)); }
    catch(e){ console.warn('SDD: could not save storage', e); }
  }

  // ---- Public API ----
  window.SDD = {
    // direct access to the live arrays (modules can read & mutate, then call save)
    get customers(){ return _data.customers; },
    get estimates(){ return _data.estimates; },
    save: save,
    // replace a whole collection
    setCustomers: function(arr){ _data.customers = arr; save(); },
    setEstimates: function(arr){ _data.estimates = arr; save(); },
    // wipe everything back to the original seed (handy for testing)
    resetAll: function(){ _data = JSON.parse(JSON.stringify(SEED)); save(); }
  };
})();
