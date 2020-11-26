const data = [
  {
    id: "dashboards",
    label: "menu.dashboards",
    icon: "iconsminds-dashboard",
    to: "/app/dashboards",
    type: 'ALL',
    subs: [
      {
        icon: "iconsminds-monitor-analytics",
        label: "menu.data",
        to: "/app/dashboards/default"
      },
      {
        icon: "iconsminds-data-center",
        label: "menu.restaurants",
        to: "/app/dashboards/analytics"
      },
      {
        icon: "simple-icon-people",
        label: "menu.usuarios",
        to: "/app/dashboards/users"
      },
      {
        icon: "iconsminds-male-female",
        label: "menu.usuarios-voucher",
        to: "/app/dashboards/userswithvocuchers"
      },
    ]
  },
  {
    id: "restaurants",
    icon: "simple-icon-list",
    label: "menu.restaurants",
    to: "/app/restaurants",
    type: 'ALL',
  },
  {
    id: "subscription",
    type: 'ALL',
    icon: "simple-icon-credit-card",
    label: "menu.payment",
    to: "/app/subscription",
    subs: [{
        id: "pages-authorization",
        label: "menu.assinaturas",
        to: "/list",
        subs: [{
            icon: "iconsminds-pen",
            label: "menu.gerenciar",
            to: "/app/subscription/list"
          },
          {
            icon: "iconsminds-money-bag",
            label: "menu.plans",
            to: "/app/subscription/plans"
          },
          {
            icon: "iconsminds-gift-box",
            label: "menu.cupons",
            to: "/app/subscription/cupom"
          },
        ]
      },
    ]
  },
  {
    id: "pushs",
    icon: "iconsminds-speach-bubble-13",
    label: "menu.pushs",
    to: "/app/notifications",
    type: 'ALL',
  },
  {
    id: "vouchers",
    icon: "iconsminds-qr-code",
    label: "menu.vouchers",
    to: "/app/vouchers",
    type: 'ALL',
  },
  {
    id: "categorias",
    icon: "iconsminds-gear",
    label: "menu.categorias",
    to: "/app/categorias",
    type: "ADMIN",
  },
  {
    id: "cidades",
    icon: "iconsminds-map-marker-2",
    label: "menu.city",
    to: "/app/cidades",
    type: "ADMIN",
  }
];
export default data;
