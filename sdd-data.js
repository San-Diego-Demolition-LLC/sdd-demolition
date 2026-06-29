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
   since:'2023', type:'commercial', waiver:'conditional', portal:false, notes:'', specialInstructions:false, paymentTerms:'net-30', billingMethod:'direct-email', sov:true, sovEstimates:[],
   contacts:[
     {id:'c1', name:'Maria Rodriguez', initials:'MR', color:'av-info', role:'billing',
      email:'billing@abcconstruction.com', phone:'(619) 555-0101', title:'Billing Manager', jobs:[]},
     {id:'c2', name:'James Torres', initials:'JT', color:'av-gold', role:'project-manager',
      email:'j.torres@abcconstruction.com', phone:'(619) 555-0102', title:'Project Manager',
      jobs:[
        {est:'EST-047', address:'1420 Harbor Blvd', city:'San Diego CA 92101', status:'In progress', startDate:'May 13, 2026', endDate:'May 22, 2026', scheduledBy:'Leontina', amount:'$14,301', date:'May 2, 2026', jobName:'Harbor Blvd Demolition', projectName:'Harbor District Redevelopment', streetOnly:'1420 Harbor Blvd', siteId:'SITE-1420-HARBOR-BLVD', hasSpecialInstructions:true, specialInstructions:'Client requires 48h notice before any demolition. Dust containment mandatory on east side.', documents:[{name:'Harbor - Master Contract.pdf', date:'May 1, 2026', category:'Contract'}],
          estimates:[
            {est:'EST-047',amount:'$14,301',status:'Paid',date:'May 2, 2026',scope:'Original Scope - Demolition',projectName:'Harbor District Redevelopment'},
            {est:'EST-052',amount:'$8,200',status:'Approved',date:'May 5, 2026',scope:'Revised Scope - Debris Removal',projectName:'Harbor Phase 2 - Site Cleanup'}
          ],
          changeOrders:[
            {est:'EST-CO047-1',originalEst:'EST-047',amount:'$2,100',status:'Approved',date:'May 10, 2026',description:'Additional haul-off - 3 loads'},
            {est:'EST-CO052-1',originalEst:'EST-052',amount:'$950',status:'Pending',date:'May 12, 2026',description:'Hazmat disposal - asbestos tile'}
          ],
          invoices:[{est:'INV-047-3',originalEst:'EST-047',amount:'$8,500',status:'Sent',date:'Apr 18, 2026',due:'May 18, 2026'},{est:'INV-047-4',originalEst:'EST-047',amount:'$6,200',status:'Sent',date:'Apr 25, 2026',due:'May 25, 2026'},{est:'INV-047-5',originalEst:'EST-047',amount:'$7,300',status:'Sent',date:'May 3, 2026',due:'Jun 2, 2026'},
            {est:'INV-047-1',originalEst:'EST-047',amount:'$14,301',status:'Paid',date:'May 15, 2026',due:'Jun 14, 2026'},
            {est:'INV-047-2',originalEst:'EST-CO047-1',amount:'$2,100',status:'Paid',date:'May 18, 2026',due:'Jun 17, 2026'}
          ]},
        {est:'EST-051', address:'880 5th Ave', city:'San Diego CA 92101', status:'Pending approval', dateSent:'May 8, 2026', amount:'$9,850', date:'May 8, 2026', jobName:'5th Ave Demo', projectName:'Gaslamp Quarter Mixed-Use', streetOnly:'880 5th Ave',
          estimates:[
            {est:'EST-051',amount:'$9,850',status:'Pending approval',date:'May 8, 2026',scope:'Site Demo - Full Clearance'}
          ],
          changeOrders:[
            {est:'EST-CO051-1',originalEst:'EST-051',amount:'$1,400',status:'Pending',date:'May 14, 2026',description:'Underground pipe removal'}
          ],
          invoices:[]},
        {est:'EST-044', address:'210 Market St', city:'San Diego CA 92101', status:'Completed', dateCompleted:'Mar 24, 2026', dateSentToClient:'Mar 25, 2026', notifications:[{type:'Invoice sent',date:'Mar 25, 2026',by:'Leontina'},{type:'Payment reminder',date:'Apr 5, 2026',by:'Leontina'}], amount:'$18,750', date:'Mar 12, 2026', jobName:'Market St Teardown', projectName:'East Village Tower Site', streetOnly:'210 Market St',
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
            {est:'INV-044-2',originalEst:'EST-CO044-1',amount:'$3,200',status:'Paid',date:'Mar 28, 2026',due:'Apr 27, 2026'}
          ]},
      ]},
     {id:'c3', name:'Sandra Lee', initials:'SL', color:'av-warning', role:'project-manager',
      email:'s.lee@abcconstruction.com', phone:'(619) 555-0103', title:'Site Supervisor',
      jobs:[
        {est:'EST-058', address:'1420 Harbor Blvd', city:'San Diego CA 92101', status:'In progress', startDate:'May 14, 2026', endDate:'May 20, 2026', scheduledBy:'Leontina', amount:'$6,400', date:'May 6, 2026', jobName:'Harbor Blvd Demolition', projectName:'Harbor District Redevelopment', streetOnly:'1420 Harbor Blvd', siteId:'SITE-1420-HARBOR-BLVD',
          billing:[{id:'c1',name:'Maria Rodriguez',email:'billing@abcconstruction.com',phone:'(619) 555-0101',role:'main'}],
          pendingBilling:false,
          estimates:[
            {est:'EST-058',amount:'$6,400',status:'Approved',date:'May 6, 2026',scope:'Grading & Site Preparation',projectName:'Harbor District Redevelopment'}
          ],
          changeOrders:[],
          invoices:[
            {est:'INV-058-1',originalEst:'EST-058',amount:'$6,400',status:'Unpaid',date:'May 18, 2026',due:'Jun 17, 2026'}
          ]},
        {est:'EST-055', address:'342 Third Ave', city:'Chula Vista CA 91910', status:'Pending scheduled', dateApproved:'Apr 28, 2026', amount:'$22,500', date:'Apr 28, 2026', jobName:'342 Third Ave Demo', projectName:'Chula Vista Retail Plaza', streetOnly:'342 Third Ave',
          estimates:[
            {est:'EST-055',amount:'$22,500',status:'Approved',date:'Apr 28, 2026',scope:'Site Demolition & Grading',projectName:'Chula Vista Retail Plaza'}
          ],
          changeOrders:[],
          invoices:[]},
      ]},
     {id:'c4', name:'Robert Park', initials:'RP', color:'av-success', role:'additional',
      email:'r.park@abcconstruction.com', phone:'(619) 555-0104', title:'Director',
      jobs:[
        {est:'EST-060', address:'7700 Mission Valley Rd', city:'San Diego CA 92108', status:'Ready to bill', completedBy:'Leontina', completionNotes:'Demo finished, site cleared and swept. Ready to invoice.', amount:'$31,200', date:'Apr 10, 2026', jobName:'Mission Valley Demo', projectName:'Mission Valley Office Park', streetOnly:'7700 Mission Valley Rd',
          estimates:[
            {est:'EST-060',amount:'$31,200',status:'Approved',date:'Apr 10, 2026',scope:'Commercial Building Demolition',projectName:'Mission Valley Office Park'}
          ],
          changeOrders:[],
          invoices:[]},
        {est:'EST-031', address:'915 Broadway', city:'San Diego CA 92101', status:'Approved', dateApproved:'Apr 22, 2026', amount:'$12,800', date:'Feb 15, 2025', jobName:'Broadway Lot Demo', projectName:'Broadway Parking Structure', streetOnly:'915 Broadway',
          estimates:[
            {est:'EST-031',amount:'$12,800',status:'Approved',date:'Feb 15, 2025',scope:'Parking Lot Demolition',projectName:'Broadway Parking Structure'}
          ],
          changeOrders:[],
          invoices:[]},
      ]},
   ]},
  {id:2, name:'Coastal Builders Inc', city:'Carlsbad, CA',
   address:'2100 Palomar Airport Rd, Carlsbad CA 92011', phone:'(760) 555-0188',
   since:'2024', type:'commercial', waiver:'conditional', portal:false, notes:'', specialInstructions:false, paymentTerms:'net-15', billingMethod:'direct-email', sov:true, sovEstimates:[],
   contacts:[
     {id:'cb1', name:'Elena Marsh', initials:'EM', color:'av-info', role:'billing',
      email:'billing@coastalbuilders.com', phone:'(760) 555-0181', title:'Billing Manager', jobs:[]},
     {id:'cb2', name:'Daniel Cruz', initials:'DC', color:'av-gold', role:'project-manager',
      email:'d.cruz@coastalbuilders.com', phone:'(760) 555-0182', title:'Project Manager',
      jobs:[
        {est:'EST-070', address:'650 Grand Ave', city:'Carlsbad CA 92008', status:'In progress', startDate:'May 4, 2026', endDate:'May 16, 2026', scheduledBy:'Ana Rivera', amount:'$26,400', date:'May 4, 2026', jobName:'Grand Ave Commercial Demo', projectName:'Carlsbad Village Center', streetOnly:'650 Grand Ave',
          billing:[{id:'cb1',name:'Elena Marsh',email:'billing@coastalbuilders.com',phone:'(760) 555-0181'}],
          pendingBilling:false,
          estimates:[
            {est:'EST-070',amount:'$26,400',status:'Paid',date:'May 4, 2026',scope:'Commercial Structure Demolition'}
          ],
          changeOrders:[
            {est:'EST-CO070-1',originalEst:'EST-070',amount:'$4,500',status:'Approved',date:'May 9, 2026',description:'Additional asbestos abatement'}
          ],
          invoices:[{est:'INV-070-1',originalEst:'EST-070',amount:'$12,400',status:'Sent',date:'May 4, 2026',due:'May 19, 2026'},{est:'INV-070-2',originalEst:'EST-070',amount:'$15,600',status:'Sent',date:'May 17, 2026',due:'Jun 1, 2026'},{est:'INV-070-3',originalEst:'EST-070',amount:'$8,900',status:'Sent',date:'May 26, 2026',due:'Jun 10, 2026'},
            {est:'INV-070-1',originalEst:'EST-070',amount:'$13,200',status:'Paid',date:'May 12, 2026',due:'Jun 11, 2026'},
            {est:'INV-070-2',originalEst:'EST-070',amount:'$13,200',status:'Unpaid',date:'May 20, 2026',due:'Jun 19, 2026'}
          ]},
        {est:'EST-066', address:'1820 Coast Hwy', city:'Oceanside CA 92054', status:'Completed', dateCompleted:'Apr 18, 2026', dateSentToClient:'Apr 20, 2026', notifications:[{type:'Invoice sent',date:'Apr 20, 2026',by:'Leontina'}], amount:'$15,900', date:'Feb 8, 2026', jobName:'Coast Hwy Teardown', projectName:'Coast Hwy Teardown', streetOnly:'1820 Coast Hwy',
          billing:[{id:'cb1',name:'Elena Marsh',email:'billing@coastalbuilders.com',phone:'(760) 555-0181'},{id:'cb2',name:'Daniel Cruz',email:'d.cruz@coastalbuilders.com',phone:'(760) 555-0182'}],
          pendingBilling:false,
          estimates:[
            {est:'EST-066',amount:'$15,900',status:'Paid',date:'Feb 8, 2026',scope:'Full Site Teardown & Haul-off'}
          ],
          changeOrders:[
            {est:'EST-CO066-1',originalEst:'EST-066',amount:'$2,800',status:'Paid',date:'Feb 14, 2026',description:'Extra dumpster rentals'}
          ],
          invoices:[
            {est:'INV-066-1',originalEst:'EST-066',amount:'$15,900',status:'Paid',date:'Feb 18, 2026',due:'Mar 20, 2026'},
            {est:'INV-066-2',originalEst:'EST-CO066-1',amount:'$2,800',status:'Paid',date:'Feb 20, 2026',due:'Mar 22, 2026'}
          ]},
      ]},
   ]},
  {id:3, name:'Pacific Demo Partners', city:'San Diego, CA', customerStatus:'inactive',
   address:'780 Industrial Way, San Diego CA 92110', phone:'(619) 555-0211',
   since:'2022', type:'commercial', waiver:'conditional', portal:false, notes:'Account inactive — no active jobs.', specialInstructions:false, paymentTerms:'net-30', billingMethod:'direct-email', sov:false, sovEstimates:[],
   contacts:[
     {id:'pd1', name:'Greg Holt', initials:'GH', color:'av-info', role:'billing',
      email:'billing@pacificdemo.com', phone:'(619) 555-0210', title:'Billing Manager', jobs:[]},
     {id:'pd2', name:'Laura Kim', initials:'LK', color:'av-gold', role:'project-manager',
      email:'l.kim@pacificdemo.com', phone:'(619) 555-0212', title:'Project Manager',
      jobs:[
        {est:'EST-040', address:'780 Industrial Way', city:'San Diego CA 92110', status:'Completed', dateCompleted:'Apr 10, 2026', dateSentToClient:'Apr 12, 2026', notifications:[{type:'Invoice sent',date:'Apr 12, 2026',by:'Ana Rivera'},{type:'Payment reminder',date:'Apr 22, 2026',by:'Leontina'},{type:'Statement sent',date:'May 1, 2026',by:'Leontina'}], amount:'$19,200', date:'Nov 3, 2025', jobName:'Industrial Way Demo', projectName:'Pacific Industrial Site', streetOnly:'780 Industrial Way',
          billing:[{id:'pd1',name:'Greg Holt',email:'billing@pacificdemo.com',phone:'(619) 555-0210'}],
          pendingBilling:false,
          estimates:[
            {est:'EST-040',amount:'$19,200',status:'Paid',date:'Nov 3, 2025',scope:'Full Structure Demolition'}
          ],
          changeOrders:[],
          invoices:[{est:'INV-040-2',originalEst:'EST-040',amount:'$9,800',status:'Sent',date:'Apr 26, 2026',due:'May 26, 2026'},{est:'INV-040-3',originalEst:'EST-040',amount:'$11,200',status:'Sent',date:'May 9, 2026',due:'Jun 8, 2026'},
            {est:'INV-040-1',originalEst:'EST-040',amount:'$19,200',status:'Paid',date:'Nov 15, 2025',due:'Dec 15, 2025'}
          ]},
      ]},
   ]},
  {id:4, name:'Summit Contractors LLC', city:'El Cajon, CA', customerStatus:'collections',
   address:'1290 Fletcher Pkwy, El Cajon CA 92020', phone:'(619) 555-0277',
   since:'2023', type:'commercial', waiver:'conditional', portal:false, notes:'Sent to collections — overdue balance.', specialInstructions:false, paymentTerms:'net-15', billingMethod:'direct-email', sov:false, sovEstimates:[],
   contacts:[
     {id:'sc1', name:'Nina Brooks', initials:'NB', color:'av-info', role:'billing',
      email:'billing@summitcontractors.com', phone:'(619) 555-0276', title:'Billing Manager', jobs:[]},
     {id:'sc2', name:'Marcus Reed', initials:'MR', color:'av-gold', role:'project-manager',
      email:'m.reed@summitcontractors.com', phone:'(619) 555-0278', title:'Project Manager',
      jobs:[
        {est:'EST-038', address:'1290 Fletcher Pkwy', city:'El Cajon CA 92020', status:'Ready to bill', completedBy:'Ana Rivera', completionNotes:'Final walkthrough done with client. All debris hauled.', dateCompleted:'Dec 5, 2025', dateSentToClient:'Dec 8, 2025', notifications:[{type:'Invoice sent',date:'Dec 8, 2025',by:'Leontina'},{type:'Payment reminder',date:'Dec 20, 2025',by:'Leontina'},{type:'Past-due notice',date:'Jan 5, 2026',by:'Leontina'}], amount:'$24,800', date:'Dec 12, 2025', jobName:'Fletcher Pkwy Demo', projectName:'Summit Retail Demo', streetOnly:'1290 Fletcher Pkwy',
          billing:[{id:'sc1',name:'Nina Brooks',email:'billing@summitcontractors.com',phone:'(619) 555-0276'}],
          pendingBilling:false,
          estimates:[
            {est:'EST-038',amount:'$24,800',status:'Approved',date:'Dec 12, 2025',scope:'Commercial Demolition'}
          ],
          changeOrders:[],
          invoices:[{est:'INV-038-2',originalEst:'EST-038',amount:'$4,500',status:'Sent',date:'May 12, 2026',due:'May 27, 2026'},{est:'INV-038-3',originalEst:'EST-038',amount:'$5,400',status:'Sent',date:'May 25, 2026',due:'Jun 9, 2026'},
            {est:'INV-038-1',originalEst:'EST-038',amount:'$24,800',status:'Past due',date:'Dec 20, 2025',due:'Jan 19, 2026'}
          ]},
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
],
    bills: [
  {id:1,vendorId:1,vendor:'Coastal Equipment Rentals',num:'BILL-001',desc:'Excavator rental May 2026',amount:3200,due:'May 25, 2026',status:'unpaid',date:'May 10, 2026'},
  {id:2,vendorId:2,vendor:'SafeAir Environmental',num:'BILL-002',desc:'Abatement Harbor Blvd',amount:4800,due:'May 15, 2026',status:'paid',date:'May 1, 2026'},
  {id:3,vendorId:3,vendor:'EDCO Disposal',num:'BILL-003',desc:'Dump fees 3 loads',amount:900,due:'May 20, 2026',status:'unpaid',date:'May 8, 2026'},
  {id:4,vendorId:4,vendor:'Pacific Concrete Cutting',num:'BILL-004',desc:'Concrete cutting Mission Valley',amount:2600,due:'Apr 30, 2026',status:'partial',date:'Apr 15, 2026'},
  {id:5,vendorId:5,vendor:'ADP Payroll',num:'BILL-005',desc:'Payroll fee April',amount:380,due:'May 1, 2026',status:'paid',date:'Apr 25, 2026'},
  {id:6,vendorId:1,vendor:'Coastal Equipment Rentals',num:'BILL-006',desc:'Skid steer rental',amount:1850,due:'May 19, 2026',status:'unpaid',date:'May 9, 2026'},
  {id:7,vendorId:3,vendor:'EDCO Disposal',num:'BILL-007',desc:'Dump fees Harbor Blvd',amount:1200,due:'May 26, 2026',status:'unpaid',date:'May 14, 2026'},
  {id:8,vendorId:2,vendor:'SafeAir Environmental',num:'BILL-008',desc:'Asbestos inspection',amount:3400,due:'May 28, 2026',status:'unpaid',date:'May 13, 2026'},
  {id:9,vendorId:4,vendor:'Pacific Concrete Cutting',num:'BILL-009',desc:'Core drilling Carlsbad',amount:2100,due:'Jun 2, 2026',status:'unpaid',date:'May 18, 2026'},
  {id:10,vendorId:1,vendor:'Coastal Equipment Rentals',num:'BILL-010',desc:'Excavator rental June',amount:3600,due:'Jun 3, 2026',status:'unpaid',date:'May 20, 2026'},
  {id:11,vendorId:3,vendor:'EDCO Disposal',num:'BILL-011',desc:'Dump fees 5 loads',amount:1500,due:'Jun 9, 2026',status:'unpaid',date:'May 26, 2026'},
  {id:12,vendorId:5,vendor:'ADP Payroll',num:'BILL-012',desc:'Payroll fee May',amount:410,due:'Jun 10, 2026',status:'unpaid',date:'May 28, 2026'}
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
    get bills(){ return _data.bills || []; },
    save: save,
    // replace a whole collection
    setCustomers: function(arr){ _data.customers = arr; save(); },
    setEstimates: function(arr){ _data.estimates = arr; save(); },
    setBills: function(arr){ _data.bills = arr; save(); },
    // wipe everything back to the original seed (handy for testing)
    resetAll: function(){ _data = JSON.parse(JSON.stringify(SEED)); save(); }
  };
})();
