package vn.hoangit.foodflow.domain;

public enum ProductCategory {
    ALL("All"),
    PIZZA("Pizza"),
    BURGER_CHICKEN("Burger & Chicken"),
    DRINKS("Drinks"),
    NOODLES("Noodles"),
    RICE("Rice");

    private final String displayName;

    ProductCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
