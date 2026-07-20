import useAdminState from "../../hooks/useAdminState";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import OverviewTab from "../../components/admin/overview/OverviewTab";
import AnalyticsTab from "../../components/admin/analytics/AnalyticsTab";
import OrdersTab from "../../components/admin/orders/OrdersTab";
import RestaurantsTab from "../../components/admin/restaurants/RestaurantsTab";
import MenuTab from "../../components/admin/menu/MenuTab";
import CategoriesTab from "../../components/admin/categories/CategoriesTab";
import DealsTab from "../../components/admin/deals/DealsTab";

export default function AdminDashboard() {
  const admin = useAdminState();

  const renderActiveTab = () => {
    switch (admin.activeTab) {
      case "overview":
        return (
          <OverviewTab
            deliveredSales={admin.analytics.total_revenue}
            activeOrdersCount={admin.analytics.total_orders}
            restaurants={admin.analytics.active_restaurants}
            totalUsers={admin.analytics.total_users}
            menuItems={admin.popularItems}
            deals={admin.popularDeals}
          />
        );
      case "analytics":
        return (
          <AnalyticsTab
            orderStatusData={admin.orderStatusData}
            revenueByRestaurant={admin.revenueByRestaurant}
            revenueOverTime={admin.revenueOverTime}
            revenueRange={admin.revenueRange}
            onRevenueRangeChange={admin.handleRevenueRangeChange}
            revenueOverTimeLoading={admin.revenueOverTimeLoading}
          />
        );
      case "orders":
        return (
          <OrdersTab
            orders={admin.orders}
            onUpdateStatus={admin.handleUpdateOrderStatus}
          />
        );
      case "restaurants":
        return (
          <RestaurantsTab
            restaurants={admin.restaurants}
            modalType={admin.modalType}
            selectedItem={admin.selectedItem}
            restaurantForm={admin.restaurantForm}
            setRestaurantForm={admin.setRestaurantForm}
            openModal={admin.openModal}
            closeModal={admin.closeModal}
            onSubmit={admin.handleRestaurantSubmit}
            onDelete={admin.handleDeleteRestaurant}
          />
        );
      case "menu":
        return (
          <MenuTab
            menuItems={admin.menuItems}
            searchQuery={admin.searchQuery}
            setSearchQuery={admin.setSearchQuery}
            restaurants={admin.restaurants}
            categories={admin.categories}
            modalType={admin.modalType}
            selectedItem={admin.selectedItem}
            menuitemForm={admin.menuitemForm}
            setMenuitemForm={admin.setMenuitemForm}
            openModal={admin.openModal}
            closeModal={admin.closeModal}
            onSubmit={admin.handleMenuitemSubmit}
            onDelete={admin.handleDeleteMenuitem}
          />
        );
      case "categories":
        return (
          <CategoriesTab
            categories={admin.categories}
            modalType={admin.modalType}
            selectedItem={admin.selectedItem}
            categoryForm={admin.categoryForm}
            setCategoryForm={admin.setCategoryForm}
            openModal={admin.openModal}
            closeModal={admin.closeModal}
            onSubmit={admin.handleCategorySubmit}
            onDelete={admin.handleDeleteCategory}
          />
        );
      case "deals":
        return (
          <DealsTab
            deals={admin.deals}
            restaurants={admin.restaurants}
            menuItems={admin.menuItems}
            modalType={admin.modalType}
            selectedItem={admin.selectedItem}
            dealForm={admin.dealForm}
            setDealForm={admin.setDealForm}
            openModal={admin.openModal}
            closeModal={admin.closeModal}
            onSubmit={admin.handleDealSubmit}
            onDelete={admin.handleDeleteDeal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout
      activeTab={admin.activeTab}
      onTabChange={admin.handleTabChange}
      activeOrdersCount={admin.activeOrdersCount}
    >
      {renderActiveTab()}
    </AdminLayout>
  );
}